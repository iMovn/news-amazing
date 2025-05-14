import { PostType } from "../types/PostRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID || "";

export async function fetchNewsPostHome(): Promise<PostType[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=3`,
      { next: { revalidate: 100 } }
    );
    if (!res.ok) throw new Error("Lỗi khi lấy bài viết mới nhất tại footer");

    const data = await res.json();
    return data.data.data || null;
  } catch (error) {
    console.error("Lỗi API News Footer:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

export async function fetchLastNewsFt(): Promise<PostType[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=5`,
      { next: { revalidate: 100 } }
    );
    if (!res.ok) throw new Error("Lỗi khi lấy bài viết mới nhất tại footer");

    const data = await res.json();
    return data.data.data || null;
  } catch (error) {
    console.error("Lỗi API News Footer:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
export async function fetchGalleryNewsFt(): Promise<PostType[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=12`,
      { next: { revalidate: 100 } }
    );
    if (!res.ok) throw new Error("Lỗi khi lấy thư viện ảnh tại footer");

    const data = await res.json();
    return data.data.data || null;
  } catch (error) {
    console.error("Lỗi API Gallery Footer:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
