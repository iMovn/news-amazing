import { Category } from "../types/CategoryRes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID || "";

let cachedCategories: Category[] | null = null;
let lastFetchTime = 0;

export async function fetchAllCategories(): Promise<Category[]> {
  const now = Date.now();
  if (cachedCategories && now - lastFetchTime < 5 * 60 * 1000) {
    return cachedCategories;
  }

  try {
    const res = await fetch(
      `${API_URL}/site/category?type=post&domain_id=${DOMAIN_ID}`,
      { next: { revalidate: 600 } }
    );
    const data = await res.json();

    let result: Category[] = [];
    if (Array.isArray(data.data?.categories)) result = data.data.categories;
    else if (Array.isArray(data.data)) result = data.data;
    else if (Array.isArray(data)) result = data;

    cachedCategories = result;
    lastFetchTime = now;

    return result;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

export async function fetchCategoryBySlug(slug: string, page: number = 1) {
  try {
    const res = await fetch(
      `${API_URL}/site/category?type=post&domain_id=${DOMAIN_ID}&slug=${slug}&page=${page}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error);
    return null;
  }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  try {
    const categories = await fetchAllCategories();
    return categories.map((category) => category.slug);
  } catch (error) {
    console.error("Error fetching category slugs:", error);
    return [];
  }
}
