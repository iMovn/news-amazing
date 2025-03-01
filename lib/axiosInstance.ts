import axios from "axios";

// Kiểm tra nếu chạy trên môi trường trình duyệt
const isClient = typeof window !== "undefined";

// Khởi tạo Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.imovn.com/api", // Đảm bảo fallback URL nếu biến môi trường thiếu
  timeout: 10000, // Tăng timeout để tránh lỗi request chậm
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token từ localStorage (chỉ chạy trên client)
axiosInstance.interceptors.request.use(
  (config) => {
    if (isClient) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi từ API
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Xử lý lỗi 401: Token hết hạn hoặc không hợp lệ
      if (status === 401 && isClient) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Điều hướng về trang đăng nhập
      }

      // Xử lý lỗi server
      if (status >= 500) {
        console.error("Lỗi máy chủ:", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
