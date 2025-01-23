"use client";

import { AlignRight, LogOut, User, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Avatar từ shadcn/ui
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen?: boolean; // Thêm trạng thái mở/đóng sidebar
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Admin");
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "/admin/avatars/defaulf-avt.jpg"
  ); // URL ảnh avatar
  const [language, setLanguage] = useState<string>("vi"); // Mặc định là tiếng Việt

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || "Register User"); // Tên người dùng
      setAvatarUrl(user.avatar || "/admin/avatars/defaulf-avt.jpg"); // Avatar mặc định nếu không có
    } else {
      console.log("Thông tin người dùng không tồn tại trong localStorage");
    }
  }, []);

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Bạn có thể lưu ngôn ngữ vào localStorage hoặc gọi API để lưu
    localStorage.setItem("language", lang);
  };

  return (
    <header className="bg-gray-50 z-10 shadow-md flex items-center justify-between px-4 py-2">
      {/* Toggle Sidebar */}
      {/* Toggle Sidebar with Animation */}
      <motion.div
        className="flex items-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: isSidebarOpen ? 90 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl focus:outline-none"
        >
          <AlignRight />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Công Ty ABC</h1>
      </motion.div>

      {/* User Info and Language */}
      <div className="flex items-center space-x-4">
        {/* Language Select */}
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Chọn ngôn ngữ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vi">Tiếng Việt</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>

        {/* Avatar and User Info */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer bg-transparent focus-visible:outline-none">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={`${userName}'s Avatar`} />
              <AvatarFallback>
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-600">Xin chào, {userName}</span>
          </DropdownMenuTrigger>

          {/* Dropdown Menu Content */}
          <DropdownMenuContent className="w-48 bg-gray-50">
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              <User className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
