"use client";

import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { PostType } from "../../components/types/PostRes";
import { insertTocToContent } from "@/utils/insertToc";

export default function Post({ post }: { post: PostType }) {
  const contentWithToc = insertTocToContent(post.content || "", post.toc || "");
  return (
    <div className="space-y-3">
      {/* Nội dung bài viết */}
      <div
        className="content_post prose max-w-none text-justify"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contentWithToc),
        }}
      />

      {/* Bài viết liên quan */}
      {post.related_posts && post.related_posts.length > 0 && (
        <div>
          <h5 className="text-lg font-semibold mt-10 mb-2">
            Bài viết liên quan
          </h5>
          <ul className="list-disc pl-4">
            {post.related_posts.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/${related.slug}.html`}
                  className="text-gray-600 hover:text-primary_layout"
                >
                  {related.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
