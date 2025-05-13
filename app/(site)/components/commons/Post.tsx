"use client";

import DOMPurify from "isomorphic-dompurify";
import { insertTocToContent } from "@/utils/insertToc";
import { PostType } from "../types/PostRes";
import RelatedPostsClientSide from "./RelatedPostsClientSide"; // Import component CSR

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  // Kiểm tra nếu post.content và post.toc tồn tại trước khi sử dụng
  const contentWithToc = post.content
    ? insertTocToContent(post.content, post.toc || "")
    : "";

  return (
    <div className="space-y-6">
      {/* Nội dung bài viết */}
      <div
        className="content_post prose max-w-none text-justify"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contentWithToc),
        }}
      />

      {/* Sử dụng component RelatedPostsClientSide để lấy bài viết liên quan từ client-side */}
      <RelatedPostsClientSide post={post} />
    </div>
  );
}
