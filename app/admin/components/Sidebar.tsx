"use client";

import {
  Gauge,
  AppWindow,
  Users,
  Settings,
  Shield,
  UserPen,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
  {
    href: "/admin/category",
    label: "Danh Mục",
    icon: AppWindow,
  },
  { href: "/admin/post", label: "Bài Viết", icon: Newspaper },
  { href: "/admin/setting", label: "Cài Đặt", icon: Settings },
  { href: "/admin/user", label: "Thành Viên", icon: Users },
  { href: "/admin/role", label: "Vai Trò", icon: Shield },
  { href: "/admin/permission", label: "Phân Quyền", icon: UserPen },
];

function SidebarItem({
  href,
  label,
  Icon,
  isSidebarOpen,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
  isSidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href); // Kiểm tra xem pathname có bắt đầu bằng href hay không

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded hover:bg-[#E9ECEF] group transition ${
        isActive
          ? "text-base font-normal text-dark-500 rounded-lg bg-white shadow-lg shadow-gray-200 hover:!bg-white group transition-all duration-200"
          : ""
      }`}
    >
      {/* Icon với kích thước cố định */}
      <div
        className={`w-6 h-6 flex items-center group-hover:text-secondary justify-center ${
          isActive ? "text-secondary" : ""
        }`}
      >
        <Icon className="w-5 h-5" /> {/* Kích thước cố định cho icon */}
      </div>
      {/* Label với hiệu ứng fade in/out */}
      {isSidebarOpen && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-3 whitespace-nowrap overflow-hidden overflow-ellipsis" // Thêm CSS để label không xuống hàng
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
}

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <motion.aside
      initial={{ width: isSidebarOpen ? 192 : 64 }} // 192px khi mở, 64px khi đóng
      animate={{ width: isSidebarOpen ? 192 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#F9FAFB] text-black flex-shrink-0 h-full overflow-hidden"
    >
      <nav className="flex flex-col p-2 space-y-2">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarItem
            key={href}
            href={href}
            label={label}
            Icon={Icon}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
      </nav>
    </motion.aside>
  );
}
