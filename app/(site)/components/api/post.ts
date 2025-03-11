import axios from "axios";
import { PostType } from "../types/PostRes";
import { LatestPost } from "../types/LatestPostRes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPost(
  slug: string,
  categoryId: number
): Promise<PostType | null> {
  try {
    const cleanSlug = slug.replace(/\.html$/, "");
    const res = await axios.get(
      `${apiUrl}/site/post?slug=${cleanSlug}&category_id=${categoryId}`
    );
    return res.data.data || null;
  } catch {
    return null;
  }
}

export async function getLatestPosts(limit: number = 9): Promise<LatestPost[]> {
  try {
    const res = await axios.get(`${apiUrl}/site/posts?limit=${limit}`);
    return res.data?.data?.data || []; // chú ý `data.data` do cấu trúc API
  } catch (error) {
    console.error("Lỗi khi lấy bài viết mới nhất:", error);
    return [];
  }
}
