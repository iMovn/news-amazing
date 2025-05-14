// components/commons/PostImage.tsx
"use client";

import Image from "next/image";
import { useEffect, useState, memo } from "react";

// Khai báo interface cho window để thêm thuộc tính _supportsWebP
interface CustomWindow extends Window {
  _supportsWebP?: boolean;
}

/**
 * Hàm kiểm tra trình duyệt có hỗ trợ định dạng WebP hay không
 * Sử dụng một ảnh WebP base64 nhỏ để kiểm tra khả năng tải
 * @returns Promise<boolean> - true nếu trình duyệt hỗ trợ WebP
 */
const supportsWebp = async (): Promise<boolean> => {
  // Kiểm tra nếu đang chạy trên server
  if (typeof window === "undefined") {
    return false;
  }

  // Cast window sang CustomWindow để có thể truy cập thuộc tính _supportsWebP
  const customWindow = window as CustomWindow;

  // Kiểm tra cache - nếu đã xác định trước đó thì trả về luôn
  if (typeof customWindow._supportsWebP !== "undefined") {
    return customWindow._supportsWebP;
  }

  // Base64 của một hình ảnh WebP nhỏ để kiểm tra khả năng tải
  const webpData =
    "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";

  try {
    // Tạo Image element và kiểm tra xem nó có tải WebP thành công không
    return await new Promise<boolean>((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        // Đặt kết quả vào cache
        customWindow._supportsWebP = true;
        resolve(true);
      };
      img.onerror = () => {
        // Đặt kết quả vào cache
        customWindow._supportsWebP = false;
        resolve(false);
      };
      img.src = webpData;
    });
  } catch (e) {
    console.error("Error checking WebP support:", e);
    return false;
  }
};

/**
 * Hàm chuyển đổi URL để lấy phiên bản WebP
 * Hỗ trợ nhiều định dạng URL từ các CMS và CDN phổ biến
 * @param url URL gốc của hình ảnh
 * @returns URL của phiên bản WebP (hoặc giữ nguyên nếu không thể)
 */
const getWebpUrl = (url: string): string => {
  if (!url) return "";

  // Kiểm tra nếu URL từ WordPress hoặc các CMS phổ biến và thêm tham số WebP
  if (url.includes("wp-content")) {
    // WordPress hoặc các hệ thống tương tự
    const hasParams = url.includes("?");
    return `${url}${hasParams ? "&" : "?"}format=webp`;
  }

  // Kiểm tra nếu URL từ Cloudinary
  if (url.includes("cloudinary.com") && !url.includes("/format/webp/")) {
    return url.replace(/\/upload\//, "/upload/format/webp/");
  }

  // Kiểm tra nếu URL từ Imgix
  if (url.includes("imgix.net") && !url.includes("fm=webp")) {
    const hasParams = url.includes("?");
    return `${url}${hasParams ? "&" : "?"}fm=webp`;
  }

  // Trường hợp khác, giữ nguyên URL
  return url;
};

// Định nghĩa props cho component PostImage
interface PostImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Component tối ưu hóa hình ảnh trong bài viết với phát hiện WebP và lazy loading
 * Kết hợp với Next.js Image để tự động tối ưu hóa hình ảnh
 */
function PostImage({
  src,
  alt = "",
  width = 640,
  height = 360,
  className = "",
  priority = false,
}: PostImageProps) {
  // State để lưu URL thực tế của hình ảnh (có thể là WebP hoặc URL gốc)
  const [imgSrc, setImgSrc] = useState(src || "/img-default.jpg");
  // State để theo dõi khi nào hình ảnh đã tải xong
  const [isLoaded, setIsLoaded] = useState(false);
  // State để lưu kết quả kiểm tra hỗ trợ WebP
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Kiểm tra hỗ trợ WebP khi component mount
  useEffect(() => {
    const checkWebpSupport = async (): Promise<void> => {
      try {
        const isWebpSupported = await supportsWebp();
        setSupportsWebP(isWebpSupported);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Error checking WebP support:", errorMessage);
      }
    };

    checkWebpSupport().catch((err) => {
      console.error("Failed to check WebP support:", err);
    });
  }, []);

  // Cập nhật src khi prop src thay đổi hoặc khi phát hiện WebP
  useEffect(() => {
    if (!src) {
      setImgSrc("/img-default.jpg");
      return;
    }

    // Sử dụng URL WebP nếu trình duyệt hỗ trợ
    if (supportsWebP) {
      setImgSrc(getWebpUrl(src));
    } else {
      setImgSrc(src);
    }

    // Reset trạng thái loaded khi src thay đổi
    setIsLoaded(false);
  }, [src, supportsWebP]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width / height}` }}
    >
      {/* Placeholder/Skeleton - hiển thị khi hình ảnh đang tải */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Next.js Image component với các props đầy đủ */}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Xử lý lỗi - chuyển sang hình mặc định
          if (imgSrc !== "/img-default.jpg") {
            setImgSrc("/img-default.jpg");
          }
        }}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

// Sử dụng memo để tránh re-render không cần thiết khi props không thay đổi
export default memo(PostImage);
