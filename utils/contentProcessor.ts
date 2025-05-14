// utils/contentProcessor.ts
// Biểu thức chính quy để tìm và xử lý hình ảnh
const IMG_REGEX = /<img\s+[^>]*src="([^"]+)"[^>]*>/gi;
const IFRAME_REGEX = /<iframe\s+[^>]*src="([^"]+)"[^>]*>/gi;

/**
 * Kiểm tra xem URL hình ảnh có phải là hình ảnh quan trọng không
 * @param src URL của hình ảnh
 * @returns true nếu là hình ảnh quan trọng
 */
function isImportantImage(src: string): boolean {
  // Hình ảnh quan trọng thường là hình ảnh lớn hoặc đầu tiên
  // Bạn có thể tùy chỉnh logic này theo nhu cầu
  return (
    src.includes("featured") ||
    src.includes("hero") ||
    src.includes("banner") ||
    src.includes("large")
  );
}

/**
 * Tối ưu hóa các thẻ img trong HTML content
 * @param htmlContent Nội dung HTML cần xử lý
 * @returns Nội dung HTML đã được tối ưu hóa
 */
export function optimizeImages(htmlContent: string): string {
  if (!htmlContent) return "";

  // Biến đếm số hình ảnh đã xử lý
  let imageCount = 0;

  // Thay thế các thẻ img bằng phiên bản tối ưu hóa
  return htmlContent.replace(IMG_REGEX, (match, src) => {
    imageCount++;

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
    const isImportant = imageCount === 1 || isImportantImage(src);

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
    // Lấy các thuộc tính từ thẻ iframe gốc
    const widthMatch = match.match(/width="([^"]+)"/i);
    const width = widthMatch ? widthMatch[1] : "100%";

    const heightMatch = match.match(/height="([^"]+)"/i);
    const height = heightMatch ? heightMatch[1] : "315";

    const titleMatch = match.match(/title="([^"]+)"/i);
    const title = titleMatch ? titleMatch[1] : "";

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
        // Tạo container lazy load cho video YouTube
        return `<div class="video-container" data-video-id="${videoId}">
          <div class="video-placeholder">
            <img 
              src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" 
              alt="YouTube video thumbnail" 
              class="video-thumbnail" 
              loading="lazy"
            />
            <div class="video-play-button">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)"/>
                <path d="M10 8l6 4-6 4V8z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>`;
      }
    }

    // Nếu không phải YouTube hoặc không thể xử lý, giữ nguyên iframe nhưng thêm loading="lazy"
    return match.replace("<iframe", '<iframe loading="lazy"');
  });
}

/**
 * Xử lý toàn bộ nội dung HTML
 * @param htmlContent Nội dung HTML cần xử lý
 * @returns Nội dung HTML đã được tối ưu hóa
 */
export function processContent(htmlContent: string): string {
  if (!htmlContent) return "";

  // Áp dụng tất cả các bước tối ưu hóa
  let processedContent = htmlContent;

  // Tối ưu hình ảnh
  processedContent = optimizeImages(processedContent);

  // Tối ưu iframe
  processedContent = optimizeIframes(processedContent);

  // Thêm các CSS styles cần thiết
  processedContent = `<style>
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
    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;
      overflow: hidden;
      margin: 1rem 0;
      cursor: pointer;
    }
    .video-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .video-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform 0.2s ease-in-out;
    }
    .video-container:hover .video-play-button {
      transform: translate(-50%, -50%) scale(1.1);
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  </style>${processedContent}`;

  return processedContent;
}
