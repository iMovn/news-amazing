import axios from "axios";
import { Category } from "../types/CategoryRes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID || "";

/**
 * Lấy tất cả danh mục
 */
export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(
      `${API_URL}/site/category?type=post&domain_id=${DOMAIN_ID}`
    );

    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.categories)
    ) {
      return response.data.data.categories;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

/**
 * Lấy chi tiết danh mục theo slug kèm danh sách bài viết có phân trang
 */
export async function fetchCategoryBySlug(slug: string, page: number = 1) {
  try {
    const response = await axios.get(
      `${API_URL}/site/category?type=post&domain_id=${DOMAIN_ID}&slug=${slug}&page=${page}`
    );

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Lấy danh sách slugs của tất cả danh mục để phục vụ Static Generation
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  try {
    const categories = await fetchAllCategories();
    return categories.map((category) => category.slug);
  } catch (error) {
    console.error("Error fetching category slugs:", error);
    return [];
  }
}
