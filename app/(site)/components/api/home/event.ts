import axios from "axios";
import { CategoryDetail } from "../../types/CategoryRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
const fetchCategoryEvent = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/site/category`, {
      params: {
        limit: 4,
        type: "post",
        slug: "van-ban-phap-quy",
        domain_id: DOMAIN_ID,
      },
    });

    const posts = response.data.data.items.data;

    // Chuyển định dạng về portfolios
    return posts.map((post: CategoryDetail) => ({
      id: post.id,
      image_url: post.image_url || "/img-default.jpg",
      title: post.name,
      description: post.description || "",
      slug: post.slug,
      created_at: post.created_at,
    }));
  } catch (error) {
    console.error("Lỗi khi gọi API Portfolio:", error);
    return [];
  }
};
export default fetchCategoryEvent;
