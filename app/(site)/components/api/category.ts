import axios from "axios";
import { CategoryResponse } from "../types/CategoryRes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Lấy toàn bộ danh mục (type=post)
export async function fetchAllCategories() {
  const res = await axios.get(`${apiUrl}/site/category?type=post&domain_id=11`);
  return res.data.data.categories || [];
}

// Lấy danh mục theo slug
export async function fetchCategoryBySlug(
  slug: string,
  page: number = 1
): Promise<CategoryResponse | null> {
  try {
    const res = await axios.get(
      `${apiUrl}/site/category?type=post&slug=${slug}&page=${page}&domain_id=11`
    );
    return res.data.data;
  } catch {
    return null;
  }
}
