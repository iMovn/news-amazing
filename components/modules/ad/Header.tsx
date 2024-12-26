import { FiAlignRight } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl focus:outline-none"
        >
          <FiAlignRight />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Admin Panel</h1>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600">Welcome, Admin</span>
      </div>
    </header>
  );
}
