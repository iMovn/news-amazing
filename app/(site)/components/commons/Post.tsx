// components/commons/Post.tsx
"use client";

import DOMPurify from "isomorphic-dompurify";
import { insertTocToContent } from "@/utils/insertToc";
import { processContent } from "@/utils/contentProcessor";
import { PostType } from "../types/PostRes";
import RelatedPostsClientSide from "./RelatedPostsClientSide";
import { useEffect, useRef, useState, useCallback } from "react";

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  // Sử dụng useRef để tham chiếu trực tiếp đến DOM node của content
  const contentRef = useRef<HTMLDivElement>(null);
  // State để theo dõi khi nào nội dung đã được xử lý và sẵn sàng hiển thị
  const [isContentReady, setIsContentReady] = useState(false);

  // Kiểm tra nếu post.content và post.toc tồn tại trước khi sử dụng
  const contentWithToc = post.content
    ? insertTocToContent(post.content, post.toc || "")
    : "";

  // Xử lý nội dung để tối ưu hóa hình ảnh và iframe
  // Truyền cả post để có thể xử lý video từ API
  const optimizedContent = processContent(contentWithToc, post);

  // Định nghĩa hàm xử lý khi click vào container video
  // Sử dụng useCallback để tối ưu hiệu năng và tránh tạo lại function mỗi lần render
  const handleVideoContainerClick = useCallback((e: Event) => {
    const container = e.currentTarget as HTMLElement;
    const videoId = container.getAttribute("data-video-id");

    if (!videoId) return;

    // Thay thế placeholder bằng iframe YouTube
    // Thêm autoplay=1 để video tự động phát sau khi click
    container.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        
      ></iframe>
    `;
  }, []);

  // Thiết lập event listeners và xử lý nội dung sau khi render
  useEffect(() => {
    const currentContentRef = contentRef.current;
    if (!currentContentRef) return;

    setIsContentReady(false);

    const observer = new MutationObserver(() => {
      const videoContainers =
        currentContentRef.querySelectorAll(".video-container");
      videoContainers.forEach((container) => {
        container.addEventListener("click", handleVideoContainerClick);
      });
    });

    observer.observe(currentContentRef, { childList: true, subtree: true });

    setIsContentReady(true);

    return () => {
      observer.disconnect();
      const videoContainers =
        currentContentRef.querySelectorAll(".video-container");
      videoContainers?.forEach((container) => {
        container.removeEventListener("click", handleVideoContainerClick);
      });
    };
  }, [optimizedContent, handleVideoContainerClick]);

  // Thêm styles global cho component - chỉ chạy một lần sau khi mount
  useEffect(() => {
    // Thêm styles cho fade-out animation và các hiệu ứng transition
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hiệu ứng fade-out cho placeholder */
      .fade-out {
        opacity: 0 !important;
        transition: opacity 0.3s ease-out;
      }
      
      /* Transition mượt mà cho hình ảnh trong PostImage container */
      .post-image-container img {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      /* Class được thêm vào khi hình ảnh đã load xong */
      .post-image-container img.opacity-100 {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function - xóa style khi component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array - chỉ chạy một lần

  return (
    <div className="space-y-6">
      {/* Nội dung bài viết với skeleton loading */}
      <div className="relative">
        {/* Hiển thị loading spinner khi nội dung chưa sẵn sàng */}
        {!isContentReady && (
          <div className="absolute inset-0 z-10 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-green-500 border-b-green-300 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Nội dung bài viết với dangerouslySetInnerHTML (đã được sanitize) */}
        <div
          ref={contentRef}
          className={`content_post prose max-w-none text-justify ${
            !isContentReady ? "opacity-25" : "opacity-100"
          } transition-opacity duration-300`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(optimizedContent),
          }}
        />
      </div>

      {/* Component bài viết liên quan */}
      <RelatedPostsClientSide post={post} />
    </div>
  );
}
