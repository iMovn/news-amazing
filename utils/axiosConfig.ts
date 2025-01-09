// utils/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000, // Thời gian chờ tối đa
});

// Thêm interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;