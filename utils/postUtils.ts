import { LatestPost } from "@/app/(site)/components/types/LatestPostRes";
import { PostType } from "@/app/(site)/components/types/PostRes";

/**
 * Chuyển đổi từ PostType sang LatestPost
 * @param post PostType object từ API
 * @returns LatestPost object đã chuyển đổi
 */
export function convertToLatestPost(post: PostType): LatestPost {
  // Đảm bảo categories luôn là một mảng và có đủ thuộc tính pivot
  const categories = (post.categories || []).map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    pivot: category.pivot || {
      post_id: post.id,
      category_id: category.id,
    },
  }));

  return {
    id: post.id,
    name: post.name,
    slug: post.slug,
    image: post.image,
    image_url: post.image_url,
    created_at: post.created_at,
    description: post.description,
    categories: categories,
  };
}

/**
 * Chuyển đổi một mảng PostType sang mảng LatestPost
 * @param posts Mảng PostType từ API
 * @returns Mảng LatestPost đã chuyển đổi
 */
export function convertToLatestPosts(posts: PostType[]): LatestPost[] {
  return posts.map((post) => convertToLatestPost(post));
}
