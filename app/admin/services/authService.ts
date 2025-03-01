import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
    message: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    token: string;
  }
  

interface LoginRequest {
  email: string;
  password: string;
}

// Hàm gọi API login
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", credentials);
    //   console.log("API Response:", response.data); // Log toàn bộ response
      return response.data; // Trả về đúng dữ liệu từ API
    } catch (error: any) {
      console.error("Login API Error:", error);
  
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }
  
      throw new Error("Không thể kết nối đến API.");
    }
  };
  
  
