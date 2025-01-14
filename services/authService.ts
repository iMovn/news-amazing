import axiosInstance from "@/lib/axiosConfig";
import axios from "axios";

interface LoginResponse {
    status: string;
    data: {
        user: {
            _id: string;
            name: string;
            email: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
        };
        token: string;
    };
    timestamp: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

// Hàm gọi API login
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
        return response.data;
    } catch (error: unknown) {
        console.error("Login API Error:", error); // Log toàn bộ lỗi để kiểm tra
        if (axios.isAxiosError(error)) {
            // Lỗi từ phía Axios
            console.error("Axios Error Response:", error.response?.data || "No response data");
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message); // Trả lỗi chi tiết từ backend
            } else {
                throw new Error("Unknown error from server.");
            }
        } else if (error instanceof Error) {
            // Lỗi chung
            throw new Error(error.message);
        } else {
            // Lỗi không xác định
            throw new Error("An unknown error occurred.");
        }
    }
};