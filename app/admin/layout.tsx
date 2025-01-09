"use client";
import Footer from "@/components/modules/ad/Footer";
import Header from "@/components/modules/ad/Header";
import Sidebar from "@/components/modules/ad/Sidebar";
import { useState } from "react";

//Layout for all pages in frontend
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="flex h-screen flex-col">
    //   <Header toggleSidebar={toggleSidebar} />
    //   <div className="flex flex-1">
    //     {isSidebarOpen && <Sidebar />}
    //     <main className="flex-1 p-4 overflow-auto bg-gray-100">{children}</main>
    //   </div>
    //   <Footer />
    // </div>

    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && <Sidebar />}

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 overflow-auto bg-gray-100">
            {children}
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
