// components/commons/Post.tsx
// components/commons/Post.tsx
"use client";

import DOMPurify from "isomorphic-dompurify";
import { insertTocToContent } from "@/utils/insertToc";
import { processContent } from "@/utils/contentProcessor";
import { PostType } from "../types/PostRes";
import RelatedPostsClientSide from "./RelatedPostsClientSide";
import { useEffect, useRef, useState, useCallback } from "react";
import PostImage from "./PostImage";
import { createRoot } from "react-dom/client";

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
        style="position: absolute; top: 0; left: 0;"
      ></iframe>
    `;
  }, []);

  // Thiết lập event listeners và xử lý nội dung sau khi render
  useEffect(() => {
    // Bảo vệ trường hợp contentRef chưa gắn với DOM
    if (!contentRef.current) return;

    // Đánh dấu bắt đầu xử lý nội dung (để hiển thị loading state)
    setIsContentReady(false);

    // Hàm thay thế các placeholder bằng component PostImage
    const replacePostImagePlaceholders = () => {
      // Tìm tất cả các elements có attribute data-post-image
      const placeholders =
        contentRef.current?.querySelectorAll("[data-post-image]");

      // Xử lý từng placeholder
      placeholders?.forEach((placeholder) => {
        // Lấy dữ liệu từ placeholder
        const src = placeholder.getAttribute("data-src") || "";
        const alt = placeholder.getAttribute("data-alt") || "";
        const width = parseInt(
          placeholder.getAttribute("data-width") || "800",
          10
        );
        const height = parseInt(
          placeholder.getAttribute("data-height") || "600",
          10
        );
        const className = placeholder.getAttribute("data-class") || "";

        // Tạo div container
        const container = document.createElement("div");
        container.className = `post-image-container ${className}`;
        // Thay thế placeholder bằng container
        placeholder.parentNode?.replaceChild(container, placeholder);

        // Sử dụng createRoot để render React component vào DOM
        // Đây là cách mới để render React components vào DOM (React 18+)
        try {
          // Tạo root cho container
          const root = createRoot(container);
          // Render PostImage component vào container
          root.render(
            <PostImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full"
              priority={true} // Các hình ảnh được đánh dấu là quan trọng
            />
          );
        } catch (error) {
          console.error("Error rendering PostImage component:", error);

          // Fallback nếu có lỗi rendering React component
          // Sử dụng HTML thuần thay vì React component
          container.innerHTML = `
            <div class="relative overflow-hidden" style="aspect-ratio: ${width}/${height}">
              <div class="absolute inset-0 bg-gray-200 animate-pulse"></div>
              <img 
                src="${src}" 
                alt="${alt}" 
                width="${width}" 
                height="${height}" 
                class="w-full h-auto object-cover opacity-0 transition-opacity duration-300"
                onload="this.classList.add('opacity-100'); this.previousElementSibling.classList.add('opacity-0');"
                onerror="this.src='/img-default.jpg'; this.classList.add('opacity-100');"
                loading="lazy"
              />
            </div>
          `;
        }
      });
    };

    // Thêm event listeners cho video containers
    // Tìm tất cả các container video trong nội dung
    const videoContainers =
      contentRef.current.querySelectorAll(".video-container");
    // Gắn event listener cho mỗi container
    videoContainers.forEach((container) => {
      container.addEventListener("click", handleVideoContainerClick);
    });

    // Xử lý lazy-loading cho hình ảnh bằng Intersection Observer API
    const setupImageObserver = () => {
      // Tạo một Intersection Observer để theo dõi khi nào hình ảnh vào viewport
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Khi hình ảnh vào viewport, thêm class loaded
              const img = entry.target as HTMLImageElement;
              img.classList.add("loaded");

              // Xóa placeholder khi hình ảnh đã load xong
              const wrapper = img.closest(".image-wrapper");
              const placeholder = wrapper?.querySelector(".image-placeholder");
              if (placeholder && img.complete) {
                placeholder.classList.add("fade-out");
                setTimeout(() => {
                  placeholder.remove();
                }, 300);
              }

              // Ngừng theo dõi khi đã xử lý
              imageObserver.unobserve(img);
            }
          });
        },
        {
          rootMargin: "100px", // Bắt đầu load khi gần viewport 100px
          threshold: 0.01, // Chỉ cần 1% hình ảnh hiển thị trong viewport
        }
      );

      // Đăng ký observer cho tất cả hình ảnh có class content-image
      const images = contentRef.current?.querySelectorAll(".content-image");
      images?.forEach((img) => {
        imageObserver.observe(img);

        // Xử lý sự kiện khi hình ảnh đã load xong
        (img as HTMLImageElement).onload = () => {
          img.classList.add("loaded");

          // Xóa placeholder
          const wrapper = img.closest(".image-wrapper");
          const placeholder = wrapper?.querySelector(".image-placeholder");
          if (placeholder) {
            placeholder.classList.add("fade-out");
            setTimeout(() => {
              placeholder?.remove();
            }, 300);
          }
        };

        // Xử lý lỗi hình ảnh - thay bằng hình mặc định
        (img as HTMLImageElement).onerror = () => {
          (img as HTMLImageElement).src = "/img-default.jpg";
          img.classList.add("loaded");
        };
      });

      return imageObserver;
    };

    // Thực hiện các thao tác DOM
    replacePostImagePlaceholders();
    const imageObserver = setupImageObserver();

    // Đánh dấu đã xử lý nội dung - cho phép hiển thị nội dung
    setIsContentReady(true);

    // Cleanup function - chạy khi component unmount hoặc dependencies thay đổi
    return () => {
      // Xóa event listeners để tránh memory leak
      videoContainers.forEach((container) => {
        container.removeEventListener("click", handleVideoContainerClick);
      });

      // Ngắt kết nối observer để tránh memory leak
      imageObserver.disconnect();
    };
  }, [optimizedContent, handleVideoContainerClick]); // Thêm handleVideoContainerClick vào dependencies

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

// "use client";

// import DOMPurify from "isomorphic-dompurify";
// import { insertTocToContent } from "@/utils/insertToc";
// import { PostType } from "../types/PostRes";
// import RelatedPostsClientSide from "./RelatedPostsClientSide"; // Import component CSR

// interface PostProps {
//   post: PostType;
// }

// export default function Post({ post }: PostProps) {
//   // Kiểm tra nếu post.content và post.toc tồn tại trước khi sử dụng
//   const contentWithToc = post.content
//     ? insertTocToContent(post.content, post.toc || "")
//     : "";

//   return (
//     <div className="space-y-6">
//       {/* Nội dung bài viết */}
//       <div
//         className="content_post prose max-w-none text-justify"
//         dangerouslySetInnerHTML={{
//           __html: DOMPurify.sanitize(contentWithToc),
//         }}
//       />

//       {/* Sử dụng component RelatedPostsClientSide để lấy bài viết liên quan từ client-side */}
//       <RelatedPostsClientSide post={post} />
//     </div>
//   );
// }
