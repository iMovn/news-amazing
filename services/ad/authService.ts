import axiosInstance from "@/utils/axiosConfig";
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
        // Ghi lại lỗi hoặc ném lỗi chi tiết hơn
        // Kiểm tra xem lỗi có phải là lỗi của Axios không
        if (axios.isAxiosError(error)) {
            // Truy cập vào error.response nếu là lỗi Axios
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message); // Lỗi chi tiết từ backend
            } else {
                throw new Error("Lỗi không xác định từ máy chủ.");
            }
        } else if (error instanceof Error) {
            // Xử lý lỗi chung (không phải lỗi từ Axios)
            throw new Error(error.message); // Lỗi chuẩn của JavaScript
        } else {
            // Lỗi không xác định
            throw new Error("Đã xảy ra lỗi không xác định.");
        }
    }
};
