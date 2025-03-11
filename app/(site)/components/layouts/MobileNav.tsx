"use client";
import { fetchMenu } from "../../components/api/menu";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Menu as MenuIcon, ChevronRight, ChevronDown } from "lucide-react";
import { MenuItem } from "../types/MenuRes";

export default function MobileNav() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  // Bọc bằng useCallback để không bị thay đổi mỗi lần render
  const filterActiveMenu = useCallback((items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => item.is_active === 1)
      .map((item) => ({
        ...item,
        children: item.children ? filterActiveMenu(item.children) : [],
      }));
  }, []);

  useEffect(() => {
    async function getMenu() {
      const data = await fetchMenu();
      const filteredMenu = filterActiveMenu(data);
      setMenuItems(filteredMenu);
    }
    getMenu();
  }, [filterActiveMenu]);

  const generateMenuKey = (id: number, parentKey?: string) =>
    parentKey ? `${parentKey}-${id}` : `${id}`;

  const toggleMenu = (id: number, parentKey?: string) => {
    const key = generateMenuKey(id, parentKey);
    setOpenMenus((prev) => {
      const newState = { ...prev };
      const parentPrefix = parentKey ? `${parentKey}-` : "";
      Object.keys(newState).forEach((menuKey) => {
        if (menuKey.startsWith(parentPrefix) && menuKey !== key) {
          delete newState[menuKey];
        }
      });
      newState[key] = !prev[key];
      return newState;
    });
  };

  const handleCloseMenu = () => {
    setOpenMenus({}); // Đóng tất cả các submenu
    setIsSheetOpen(false);
  };

  const renderMenuItems = (items: MenuItem[], parentKey?: string) => {
    return items.map((item) => {
      const key = generateMenuKey(item.id, parentKey);
      const isOpen = openMenus[key] || false;
      const isActive = pathname === item.link;
      const isSubMenu = !!parentKey;

      return (
        <div
          key={key}
          className={`ml-4 ${isSubMenu ? "submenu" : "parent-menu"}`}
        >
          <div className="flex justify-between items-center">
            <Link
              href={item.link}
              className={`text-[17px] font-semibold block ${
                isActive
                  ? "text-primary_layout"
                  : "text-black/90 hover:text-gray-600"
              } ${isSubMenu ? "text-gray-600 !text-base !pt-2" : ""}`}
              onClick={handleCloseMenu}
            >
              {item.name}
            </Link>
            {Array.isArray(item.children) && item.children.length > 0 && (
              <span
                className="text-xs text-gray-500 cursor-pointer focus:outline-none"
                onClick={() => toggleMenu(item.id, parentKey)}
                aria-label={isOpen ? "Đóng menu" : "Mở menu"}
              >
                {isOpen ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </span>
            )}
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderMenuItems(item.children, key)}
            </motion.div>
          )}
        </div>
      );
    });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button
          className="focus:outline-none"
          aria-label="Mở menu"
          onClick={() => setIsSheetOpen(true)}
        >
          <MenuIcon
            size="30px"
            className="text-gray-600 bg-gray-100 p-1 rounded-md"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="menu_mobile w-[300px] sm:w-[400px] bg-white"
      >
        <DialogTitle>
          <VisuallyHidden>Menu</VisuallyHidden>
        </DialogTitle>
        <DialogDescription>
          <VisuallyHidden>Menu điều hướng chính</VisuallyHidden>
        </DialogDescription>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-3 mt-7"
        >
          {renderMenuItems(menuItems)}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
