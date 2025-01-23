import { Gauge, Users, Settings, Shield, UserPen, Newspaper } from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Gauge },
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
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
    >
      <Icon className="mr-3 w-5 h-5" />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 text-black w-64 flex-shrink-0">
      <div className="p-4 text-lg font-bold text-center border-b border-purple-700">
        Admin Sidebar
      </div>
      <nav className="flex flex-col p-2 space-y-2">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>
    </aside>
  );
}
