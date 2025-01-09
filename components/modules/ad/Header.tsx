"use client";

import { FiAlignRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Lấy tên người dùng từ localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      console.log("Thông tin người dùng:", user);
      setUserName(user.name || "Admin");
    } else {
      console.log("Thông tin người dùng không tồn tại trong localStorage");
    }
  }, []);

  const handleLogout = () => {
    // Xóa token và thông tin user khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Chuyển hướng người dùng về trang đăng nhập
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl focus:outline-none"
        >
          <FiAlignRight />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Công Ty ABC Gì Đấy</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Xin chào, {userName}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
