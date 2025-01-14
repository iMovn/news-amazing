"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const router = useRouter();

  // Kiểm tra quyền truy cập
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Điều hướng về trang đăng nhập nếu không có token
      router.push("/login");
    } else {
      setIsLoading(false); // Dừng loading nếu có token
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    // Hiển thị màn hình loading
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && <Sidebar />}

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 overflow-hidden bg-white">
            {children}
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
