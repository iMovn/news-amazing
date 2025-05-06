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
          <h2 className="text-xl font-semibold mt-10 mb-4">
            Bài viết liên quan
          </h2>
          <ul className="list-disc pl-4 space-y-2">
            {post.related_posts.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/${related.slug}.html`}
                  className="text-blue-600 hover:underline"
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
