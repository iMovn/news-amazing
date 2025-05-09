import axios from "axios";
import { CategoryPost } from "../../types/CategoryRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

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
    // Chỉ lấy bài viết có is_active === 1
    const activePosts = posts.filter(
      (post: CategoryPost) => post.is_active === 1
    );

    // Chuyển định dạng về portfolios
    return activePosts.map((post: CategoryPost) => ({
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
