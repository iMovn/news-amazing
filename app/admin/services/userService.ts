import { User } from "@/app/admin/types/user";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  // API LẤY USERS
  type ApiResponse = {
    status: boolean;
    message: string;
    data: User[];
  };


  // Hàm lấy danh sách người dùng
  export const fetchUsers = async ():Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${apiUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return response.data; // Đảm bảo API thực sự trả về { status, message, data }
        } catch (error) {
        console.error("Error fetching users:", error);
        return { status: false, message: "Lỗi khi tải users", data: [] }; //Đảm bảo luôn trả về đúng kiểu ApiResponse
    }
  };