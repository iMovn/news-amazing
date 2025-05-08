import axios from "axios";
import { CategoryResponse } from "../types/CategoryRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

// Lấy toàn bộ danh mục (type=post)
export async function fetchAllCategories() {
  const res = await axios.get(
    `${API_BASE_URL}/site/category?type=post&domain_id=${DOMAIN_ID}`
  );
  return res.data.data.categories || [];
}

// Lấy danh mục theo slug
export async function fetchCategoryBySlug(
  slug: string,
  page: number = 1
): Promise<CategoryResponse | null> {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/site/category?type=post&slug=${slug}&page=${page}&domain_id=${DOMAIN_ID}`
    );
    return res.data.data;
  } catch {
    return null;
  }
}
