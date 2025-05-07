"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDateVi } from "@/utils/date";
import { CategoryPost } from "../../components/types/CategoryRes";
import DOMPurify from "isomorphic-dompurify";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

function PostImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/img-default.jpg");

  return (
    <div className="relative">
      <Image
        src={imgSrc}
        alt={alt}
        width={256}
        height={180}
        loading="lazy"
        quality={100}
        className="w-full h-auto object-cover"
        onError={() => setImgSrc("/img-default.jpg")}
      />
    </div>
  );
}

export default function PostCard({
  posts,
  categoryName,
}: {
  posts: CategoryPost[];
  categoryName: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!posts || posts.length === 0) {
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
          className="group border-[1px] rounded-md p-4 shadow-sm border-b-4 border-b-primary_layout"
        >
          <Link href={`/${post.slug}.html`}>
            <PostImage
              src={post.image_url ?? "/img-default.jpg"}
              alt={post.slug}
            />
          </Link>
          <p className="flex items-center gap-1 text-xs text-gray-500 mt-3">
            <CalendarDays size="14px" color="#9CC900" />{" "}
            {formatDateVi(post.created_at)}
          </p>
          <Link href={`/${post.slug}.html`}>
            <h3 className="font-semibold text-lg mt-2 leading-6 group-hover:text-hover_layout">
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
      ))}
    </div>
  );
}
