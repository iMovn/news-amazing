import axios from "axios";
import { PostType } from "../types/PostRes";
import { LatestPost } from "../types/LatestPostRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

/**
 * Lấy bài viết theo slug và categoryId
 */

export async function fetchPost(
  slug: string,
  categoryId: number
): Promise<PostType | null> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}&category_id=${categoryId}`
    );

    if (response.data && response.data.status && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(
      `Error fetching post with slug ${slug} and categoryId ${categoryId}:`,
      error
    );
    return null;
  }
}

/**
 * API mới: Lấy bài viết chỉ dựa vào slug (không cần category_id)
 * Đây là API tối ưu nhất để tránh vòng lặp qua tất cả category
 */
export async function fetchPostBySlugOnly(
  slug: string
): Promise<PostType | null> {
  try {
    // Gọi API endpoint mới không yêu cầu category_id
    const response = await axios.get(
      `${API_BASE_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}`
    );

    if (response.data && response.data.status && response.data.data) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Lấy bài viết mới nhất
 */
export async function getLatestPosts(limit: number = 5): Promise<LatestPost[]> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/site/posts?limit=${limit}&page=1&sort_name=desc&sort_by=created_at&domain_id=${DOMAIN_ID}`
    );

    if (
      response.data &&
      response.data.status &&
      response.data.data &&
      response.data.data.data
    ) {
      return response.data.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

/**
 * Lấy các bài viết liên quan đến một category cụ thể
 */
export async function getRelatedPostsByCategory(
  categoryId: number,
  limit: number = 6
): Promise<LatestPost[]> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/site/category/${categoryId}/posts?limit=${limit}&page=1&domain_id=${DOMAIN_ID}`
    );

    if (
      response.data &&
      response.data.status &&
      response.data.data &&
      response.data.data.data
    ) {
      return response.data.data.data;
    }
    return [];
  } catch (error) {
    console.error(
      `Error fetching related posts for category ${categoryId}:`,
      error
    );
    return [];
  }
}
