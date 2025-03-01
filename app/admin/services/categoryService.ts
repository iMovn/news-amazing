import { Category } from "@/app/admin/types/category";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// API LẤY DANH MỤC (Đã Fix)
type ApiResponse = {
  status: boolean;
  message: string;
  data: Category[];
};

export const fetchCategories = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${apiUrl}/categories`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    return response.data; // ✅ Đảm bảo API thực sự trả về { status, message, data }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { status: false, message: "Lỗi khi tải danh mục", data: [] }; //Đảm bảo luôn trả về đúng kiểu ApiResponse
  }
};

// API XOÁ DANH MỤC
export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${apiUrl}/categories/${id}`, {
      headers: getAuthHeaders(),
    });
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};

// API CẬP NHẬT TRẠNG THÁI DANH MỤC
export const updateCategoryStatus = async (
  id: number,
  isActive: number
): Promise<boolean> => {
  try {
    await axios.put(
      `${apiUrl}/categories/${id}`,
      { is_active: isActive },
      { headers: getAuthHeaders() }
    );
    return true;
  } catch (error) {
    console.error("Error updating category status:", error);
    return false;
  }
};