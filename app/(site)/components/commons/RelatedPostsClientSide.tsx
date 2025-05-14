// components/commons/RelatedPostsClientSide.tsx - Phiên bản tối ưu

"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDateVi } from "@/utils/date";
import { PostType } from "../types/PostRes";

interface RelatedPostsProps {
  post: PostType;
}

export default function RelatedPostsClientSide({ post }: RelatedPostsProps) {
  return (
    <>
      {post.related_posts && post.related_posts.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Bài viết liên quan
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {post.related_posts.map((related) => (
              <div
                key={related.id}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/${related.slug}.html`}>
                  <div className="relative aspect-video">
                    <Image
                      src={related.image_url || "/img-default.jpg"}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-base text-gray-800 line-clamp-2 hover:text-green-600 transition-colors">
                      {related.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* {related.categories && related.categories[0]?.name && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                          {related.categories[0].name}
                        </span>
                      )} */}
                      <span className="text-xs text-gray-500">
                        {formatDateVi(related.created_at)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
