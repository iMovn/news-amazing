import { Gauge, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 text-black w-64 flex-shrink-0">
      <div className="p-4 text-lg font-bold text-center border-b border-purple-700">
        Admin Sidebar
      </div>
      <nav className="flex flex-col p-2">
        <Link
          href="/admin"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <Gauge className="mr-3" /> Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <Users className="mr-3" /> Users
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <Settings className="mr-3" /> Settings
        </Link>
      </nav>
    </aside>
  );
}
