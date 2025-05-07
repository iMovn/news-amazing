import axios from "axios";
import { CategoryPost, CategoryResponse } from "../types/CategoryRes";

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

// Lấy danh sách bài viết theo slug
const fetchCategoryPortfolio = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/site/category`, {
      params: {
        limit: 8,
        type: "post",
        slug: "chuong-trinh-bao-ve-moi-truong",
        domain_id: DOMAIN_ID,
      },
    });

    const posts = response.data.data.items.data;

    // Chuyển định dạng về portfolios
    return posts.map((post: CategoryPost) => ({
      id: post.id,
      image_url: post.image_url || "/img-default.jpg",
      title: post.name,
      description: post.description || "",
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Lỗi khi gọi API Portfolio:", error);
    return [];
  }
};

export default fetchCategoryPortfolio;
