import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Something went wrong";

        if (status === 401) {
            console.error("Session expired. Redirecting to login...");
            window.location.href = "/login";
        }

        console.error(`Error ${status}: ${message}`);
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;