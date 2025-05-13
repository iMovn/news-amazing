import { MenuItem } from "../types/MenuRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

export async function fetchMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/menu?type=main&domain_id=${DOMAIN_ID}`
    );
    if (!res.ok) throw new Error("Lỗi khi lấy menu");

    const { data } = await res.json();
    return data as MenuItem[]; // Ép kiểu dữ liệu về MenuItem[]
  } catch (error) {
    console.error("Lỗi API Menu:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

export async function fetchMenuFt(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/menu?type=footer&domain_id=${DOMAIN_ID}`
    );
    if (!res.ok) throw new Error("Lỗi khi lấy menu footer");

    const { data } = await res.json();
    return data as MenuItem[]; // Ép kiểu dữ liệu về MenuItem[]
  } catch (error) {
    console.error("Lỗi API Menu:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
