// File: utils/contentProcessor.ts
import { PostType } from "@/app/(site)/components/types/PostRes";

const IMG_REGEX = /<img\s+[^>]*src="([^"]+)"[^>]*>/gi;
const IFRAME_REGEX = /<iframe\s+[^>]*src="([^"]+)"[^>]*>/gi;
const YOUTUBE_URL_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;

export function extractYouTubeId(url: string): string | null {
  const match = url.match(YOUTUBE_URL_REGEX);
  return match ? match[1] : null;
}

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

export function optimizeImages(html: string): string {
  return html.replace(IMG_REGEX, (match, src) => {
    const alt = match.match(/alt="([^"]+)"/i)?.[1] || "";
    const width = match.match(/width="([^"]+)"/i)?.[1] || "";
    const height = match.match(/height="([^"]+)"/i)?.[1] || "";
    const className = match.match(/class="([^"]+)"/i)?.[1] || "";
    const isImportant = width && parseInt(width) > 600;

    if (isImportant) {
      return `<div data-post-image data-src="${src}" data-alt="${alt}" data-width="${width}" data-height="${height}" data-class="${className}" class="post-image-placeholder"></div>`;
    }

    return `<figure class="image-wrapper">
      <div class="image-placeholder"></div>
      <img src="${src}" alt="${alt}" ${width && `width=\"${width}\"`} ${
      height && `height=\"${height}\"`
    } class="content-image ${className}" loading="lazy" decoding="async"/>
    </figure>`;
  });
}

export function optimizeIframes(html: string): string {
  return html.replace(IFRAME_REGEX, (match, src) => {
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const videoId =
        extractYouTubeId(src) || src.split("/").pop()?.split("?")[0] || "";
      return videoId ? createYouTubeHTML(videoId) : match;
    }
    return match.replace("<iframe", '<iframe loading="lazy"');
  });
}

export function processContent(html: string, post?: PostType): string {
  let result = html ? optimizeImages(optimizeIframes(html)) : "";
  if (post?.video) {
    const videoId = extractYouTubeId(post.video);
    if (videoId) {
      const videoHTML = createYouTubeHTML(videoId);
      const firstP = result.indexOf("</p>");
      result =
        firstP !== -1
          ? videoHTML + result.slice(0, firstP + 4) + result.slice(firstP + 4)
          : videoHTML + result;
    }
  }
  return result;
}
