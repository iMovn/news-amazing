// utils/contentProcessor.ts
import { PostType } from "@/app/(site)/components/types/PostRes";

// Biểu thức chính quy để tìm và xử lý hình ảnh
const IMG_REGEX = /<img\s+[^>]*src="([^"]+)"[^>]*>/gi;
const IFRAME_REGEX = /<iframe\s+[^>]*src="([^"]+)"[^>]*>/gi;
const YOUTUBE_URL_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;

/**
 * Trích xuất video ID từ URL YouTube
 * @param url URL YouTube
 * @returns Video ID hoặc null nếu không phải URL YouTube hợp lệ
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  const match = url.match(YOUTUBE_URL_REGEX);
  return match ? match[1] : null;
}

/**
 * Tạo HTML cho video container
 * @param videoId ID của video YouTube
 * @returns HTML string cho video container
 */
export function createYouTubeHTML(videoId: string): string {
  return `
    <div class="video-container" data-video-id="${videoId}">
      <img 
        src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
        alt="YouTube video thumbnail" 
        class="video-thumbnail" 
        loading="lazy"
        onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"
      />
      <div class="youtube-play-button">
        <div class="youtube-play-button-bg"></div>
        <div class="youtube-play-button-icon"></div>
      </div>
    </div>
  `;
}

/**
 * Tối ưu hóa các thẻ img trong HTML content
 * @param htmlContent Nội dung HTML cần xử lý
 * @returns Nội dung HTML đã được tối ưu hóa
 */
export function optimizeImages(htmlContent: string): string {
  if (!htmlContent) return "";

  // Thay thế các thẻ img bằng phiên bản tối ưu hóa
  return htmlContent.replace(IMG_REGEX, (match, src) => {
    // Lấy các thuộc tính từ thẻ img gốc
    const altMatch = match.match(/alt="([^"]+)"/i);
    const alt = altMatch ? altMatch[1] : "";

    const widthMatch = match.match(/width="([^"]+)"/i);
    const width = widthMatch ? widthMatch[1] : "";

    const heightMatch = match.match(/height="([^"]+)"/i);
    const height = heightMatch ? heightMatch[1] : "";

    const classMatch = match.match(/class="([^"]+)"/i);
    const className = classMatch ? classMatch[1] : "";

    // Xác định nếu đây là hình ảnh quan trọng (hình đầu tiên hoặc hình lớn)
    const isImportant = width && parseInt(width) > 600;

    // Đối với hình ảnh quan trọng, sử dụng component PostImage
    if (isImportant) {
      return `<div 
        data-post-image 
        data-src="${src}" 
        data-alt="${alt}" 
        data-width="${width || "800"}" 
        data-height="${height || "600"}" 
        data-class="${className}"
        class="post-image-placeholder"
      ></div>`;
    }

    // Đối với các hình ảnh thông thường, sử dụng lazy-loading tiêu chuẩn
    return `<figure class="image-wrapper">
      <div class="image-placeholder"></div>
      <img 
        src="${src}" 
        alt="${alt}" 
        ${width ? `width="${width}"` : ""}
        ${height ? `height="${height}"` : ""}
        class="content-image ${className}" 
        loading="lazy" 
        decoding="async"
      />
    </figure>`;
  });
}

/**
 * Tối ưu hóa các thẻ iframe (thường là video) trong HTML content
 * @param htmlContent Nội dung HTML cần xử lý
 * @returns Nội dung HTML đã được tối ưu hóa
 */
export function optimizeIframes(htmlContent: string): string {
  if (!htmlContent) return "";

  // Thay thế các thẻ iframe bằng phiên bản tối ưu hóa
  return htmlContent.replace(IFRAME_REGEX, (match, src) => {
    // Thay thế iframe YouTube bằng phiên bản nhẹ hơn với thumbnail
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      // Lấy ID video từ URL YouTube
      let videoId = "";

      if (src.includes("youtube.com/embed/")) {
        videoId = src.split("/embed/")[1].split("?")[0];
      } else if (src.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(src.split("?")[1]);
        videoId = urlParams.get("v") || "";
      } else if (src.includes("youtu.be/")) {
        videoId = src.split("youtu.be/")[1].split("?")[0];
      }

      if (videoId) {
        // Tạo container tối ưu cho video YouTube
        return createYouTubeHTML(videoId);
      }
    }

    // Nếu không phải YouTube hoặc không thể xử lý, giữ nguyên iframe nhưng thêm loading="lazy"
    return match.replace("<iframe", '<iframe loading="lazy"');
  });
}

/**
 * Xử lý toàn bộ nội dung HTML và thêm video nếu có
 * @param htmlContent Nội dung HTML cần xử lý
 * @param post Dữ liệu bài viết có thể chứa URL video
 * @returns Nội dung HTML đã được tối ưu hóa
 */
export function processContent(htmlContent: string, post?: PostType): string {
  if (!htmlContent) return "";

  // Áp dụng tất cả các bước tối ưu hóa
  let processedContent = htmlContent;

  // Tối ưu hình ảnh
  processedContent = optimizeImages(processedContent);

  // Tối ưu iframe
  processedContent = optimizeIframes(processedContent);

  // Thêm video từ post nếu có
  if (post?.video) {
    const videoId = extractYouTubeId(post.video);
    if (videoId) {
      // Thêm video vào đầu hoặc cuối nội dung tùy theo nhu cầu
      // Ở đây tôi thêm vào đầu nội dung, sau các thẻ p đầu tiên (nếu có)
      const firstParagraphEnd = processedContent.indexOf("</p>");
      if (firstParagraphEnd !== -1) {
        const insertPosition = firstParagraphEnd + 4; // sau thẻ </p>
        processedContent =
          processedContent.substring(0, insertPosition) +
          `<div class="my-6">${createYouTubeHTML(videoId)}</div>` +
          processedContent.substring(insertPosition);
      } else {
        // Nếu không tìm thấy thẻ p, thêm vào đầu
        processedContent =
          `<div class="my-6">${createYouTubeHTML(videoId)}</div>` +
          processedContent;
      }
    }
  }

  // Thêm các CSS styles cần thiết
  processedContent = `<style>
  /* Styles chung cho containers */
  .image-wrapper {
    position: relative;
    margin: 1rem 0;
    overflow: hidden;
  }
  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    animation: pulse 1.5s ease-in-out 0.5s infinite;
  }
  .content-image {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    display: block;
    width: 100%;
    height: auto;
  }
  .content-image.loaded {
    opacity: 1;
  }
  .post-image-placeholder {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    background-color: #f0f0f0;
    animation: pulse 1.5s ease-in-out 0.5s infinite;
    margin: 1rem 0;
  }
  
  /* Video container styles */
  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
    margin: 1rem 0;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .video-thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .video-container:hover .video-thumbnail {
    transform: scale(1.05);
  }
  
  /* YouTube play button styling */
  .youtube-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  
  .youtube-play-button-bg {
    width: 70px;
    height: 70px;
    background-color: rgba(200, 0, 0, 0.8);
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .video-container:hover .youtube-play-button-bg {
    background-color: rgba(220, 0, 0, 1);
    transform: scale(1.1);
  }
  
  .youtube-play-button-icon {
    position: absolute;
    top: 50%;
    left: 53%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 26px;
    border-color: transparent transparent transparent white;
  }
  
  /* Animation styles */
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
</style>${processedContent}`;

  return processedContent;
}
