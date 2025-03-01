"use client";

import { AlignRight, LogOut, User, Settings, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion"; // Thêm Framer Motion

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Admin");
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "/admin/avatars/defaulf-avt.jpg"
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || "Register User");
      setAvatarUrl(user.avatar || "/admin/avatars/defaulf-avt.jpg");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="bg-gray-50 z-10 shadow-md flex items-center justify-between px-4 py-2">
      {/* Toggle Sidebar with Animation */}
      <motion.div
        className="flex items-center"
        initial={{ rotate: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <AlignRight /> : <Menu />}
        </button>
        <motion.h1
          initial={{
            opacity: isSidebarOpen ? 1 : 0,
            x: isSidebarOpen ? 0 : -20,
          }}
          animate={{
            opacity: isSidebarOpen ? 1 : 0,
            x: isSidebarOpen ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          className="ml-4 text-lg font-semibold"
        >
          Công Ty ABC
        </motion.h1>
      </motion.div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
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
