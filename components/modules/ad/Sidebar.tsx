import { FaHome, FaUser, FaCog } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4 text-lg font-bold text-center border-b border-gray-700">
        Admin Sidebar
      </div>
      <nav className="flex flex-col p-2">
        <Link
          href="/admin"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <FaHome className="mr-3" /> Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <FaUser className="mr-3" /> Users
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
        >
          <FaCog className="mr-3" /> Settings
        </Link>
      </nav>
    </aside>
  );
}
