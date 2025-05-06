import axios from "axios";
import { PostType } from "../types/PostRes";
import { LatestPost } from "../types/LatestPostRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export async function fetchPost(
  slug: string,
  categoryId: number
): Promise<PostType | null> {
  try {
    const cleanSlug = slug.replace(/\.html$/, "");
    const res = await axios.get(
      `${API_BASE_URL}/site/post?slug=${cleanSlug}&category_id=${categoryId}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data || null;
  } catch {
    return null;
  }
}

export async function getLatestPosts(limit: number = 9): Promise<LatestPost[]> {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/site/posts?limit=${limit}&domain_id=${DOMAIN_ID}`
    );
    return res.data?.data?.data || []; // chú ý `data.data` do cấu trúc API
  } catch (error) {
    console.error("Lỗi khi lấy bài viết mới nhất:", error);
    return [];
  }
}
