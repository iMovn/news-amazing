"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDateVi } from "@/utils/date";
import DOMPurify from "isomorphic-dompurify";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { PostType } from "../types/PostRes";

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/img-default.jpg");

  return (
    <div className="relative w-full h-[170px] rounded-t-xl overflow-hidden">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={() => setImgSrc("/img-default.jpg")}
      />
    </div>
  );
}

export default function PostCard({
  posts,
  categoryName,
}: {
  posts: PostType[];
  categoryName: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <p>
        Danh mục <strong>{categoryName}</strong> chưa có bài viết nào. Hãy thêm
        bài viết mới!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="group shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden bg-white"
        >
          <Link href={`/${post.slug}.html`}>
            <PostImage
              src={post.image_url ?? "/img-default.jpg"}
              alt={post.slug}
            />
          </Link>
          <div className="px-4 pb-4">
            <p className="flex items-center gap-1 text-xs text-gray-500 mt-3">
              <CalendarDays size="14px" color="#9CC900" />{" "}
              {formatDateVi(post.created_at)}
            </p>
            <Link href={`/${post.slug}.html`}>
              <h3 className="font-semibold line-clamp-2 text-lg mt-2 leading-6 group-hover:text-hover_layout">
                {post.name}
              </h3>
            </Link>
            {mounted && (
              <p
                className="text-sm text-gray-600 mt-1 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description || ""),
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
