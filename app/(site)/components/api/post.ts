import axios from "axios";
import { PostType, RelatedPost } from "../types/PostRes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID || "";

/**
 * Lấy bài viết theo slug và categoryId
 */
export async function fetchPost(
  slug: string,
  categoryId: number
): Promise<PostType | null> {
  try {
    const response = await axios.get(
      `${API_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}&category_id=${categoryId}`
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
 * API tối ưu: Lấy bài viết chỉ dựa vào slug  (cho trang chi tiết bài viết)
 */
export async function fetchPostBySlugOnly(
  slug: string
): Promise<PostType | null> {
  try {
    const response = await axios.get(`${API_URL}/site/post`, {
      params: {
        slug,
        domain_id: DOMAIN_ID,
      },
    });

    if (response.data?.status && response.data.data) {
      console.log("✅ Fetched post data:", response.data.data);
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Lấy bài viết liên quan theo categoryId, loại trừ bài viết hiện tại
 */
export async function getRelatedPosts(
  categoryId: number,
  excludeSlug: string,
  limit: number = 5
): Promise<RelatedPost[]> {
  try {
    const response = await axios.get(`${API_URL}/site/posts`, {
      params: {
        domain_id: DOMAIN_ID,
        category_id: categoryId,
        limit,
      },
    });

    if (
      response.data &&
      response.data.status &&
      response.data.data &&
      Array.isArray(response.data.data.data)
    ) {
      return response.data.data.data.filter(
        (post: PostType) => post.slug !== excludeSlug
      );
    }

    return [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
/**
 * Lấy danh sách slugs của tất cả bài viết để phục vụ Static Generation
 */
export async function getAllPostSlugs(limit: number = 100): Promise<string[]> {
  try {
    const response = await axios.get(
      `${API_URL}/site/posts?limit=${limit}&page=1&sort_name=desc&sort_by=created_at&domain_id=${DOMAIN_ID}`
    );

    if (
      response.data &&
      response.data.status &&
      response.data.data &&
      response.data.data.data
    ) {
      return response.data.data.data
        .map((post: PostType) =>
          // Trả về đúng định dạng slug.html
          post.slug ? `${post.slug}.html` : ""
        )
        .filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

/**
 * Lấy danh sách bài viết mới nhất (cho sidebar hoặc trang chủ)
 */
export async function getLatestPosts(limit: number = 5): Promise<PostType[]> {
  try {
    const response = await axios.get(`${API_URL}/site/posts`, {
      params: {
        domain_id: DOMAIN_ID,
        limit,
        sort_by: "created_at",
        sort_name: "desc",
      },
    });

    if (
      response.data?.status &&
      response.data.data?.data &&
      Array.isArray(response.data.data.data)
    ) {
      return response.data.data.data;
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching latest posts:", error);
    return [];
  }
}
