import { MenuItem } from "../types/MenuRes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

export async function fetchMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${apiUrl}/site/menu?type=main&domain_id=11`);
    if (!res.ok) throw new Error("Lỗi khi lấy menu");

    const { data } = await res.json();
    return data as MenuItem[]; // Ép kiểu dữ liệu về MenuItem[]
  } catch (error) {
    console.error("Lỗi API Menu:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
