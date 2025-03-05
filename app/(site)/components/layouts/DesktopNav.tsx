"use client";
import { fetchMenu } from "../api/menu";
import { MenuItem } from "../types/menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function DesktopNav() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();

  // Fetch menu data
  useEffect(() => {
    async function loadMenu() {
      const menuData = await fetchMenu();
      const activeMenu = filterActiveMenu(menuData);
      setMenuItems(activeMenu);
    }
    loadMenu();
  }, []);

  // Hàm đệ quy lọc menu có is_active: 1
  const filterActiveMenu = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => item.is_active === 1)
      .map((item) => ({
        ...item,
        children: item.children ? filterActiveMenu(item.children) : [],
      }));
  };

  // Hàm kiểm tra xem một menu item có active không
  const isItemActive = (link: string): boolean => {
    // Xử lý trường hợp trang chủ
    if (link === "/") {
      return pathname === "/";
    }
    // Với các route khác, loại trừ trang chủ và kiểm tra chính xác
    return (
      pathname.startsWith(link) &&
      (pathname === link || pathname.startsWith(link + "/"))
    );
  };

  // Hàm kiểm tra xem item hoặc bất kỳ children nào của nó có active không
  const isItemOrChildrenActive = (menu: MenuItem): boolean => {
    if (isItemActive(menu.link)) return true;

    if (menu.children) {
      return menu.children.some(
        (child) =>
          isItemActive(child.link) ||
          (child.children &&
            child.children.some(
              (subChild) =>
                isItemActive(subChild.link) ||
                (subChild.children &&
                  subChild.children.some((deepChild) =>
                    isItemActive(deepChild.link)
                  ))
            ))
      );
    }

    return false;
  };

  // Render menu items
  const renderMenu = (items: MenuItem[], level = 0) => {
    return items.map((menu) => {
      const isActive = isItemOrChildrenActive(menu);
      const hasChildren = menu.children && menu.children.length > 0;

      return (
        <div key={menu.id} className="relative group/parent">
          <Link
            href={menu.link}
            className={`p-1 focus:outline-none focus:ring-0 transition-colors duration-200 
              ${
                isActive
                  ? "text-primary_layout hover:text-primary_layout"
                  : "text-black/90 hover:text-primary_layout"
              }
            `}
          >
            {menu.name}
          </Link>

          {/* Render dropdown content if has children */}
          {hasChildren && (
            <div
              className={`absolute top-full capitalize font-medium hidden group-hover/parent:block w-[230px] pt-8 z-50`}
            >
              <div
                className={`bg-white border border-gray-200 rounded-lg shadow-lg py-2`}
              >
                {menu.children.map((child) => {
                  const isChildActive = isItemOrChildrenActive(child);

                  return (
                    <div key={child.id} className="relative group/child">
                      <Link
                        href={child.link}
                        className={`flex px-3 py-2 hover:bg-gray-50 items-center justify-between
                          ${
                            isChildActive
                              ? "text-primary_layout hover:text-primary_layout"
                              : "text-black/90 hover:text-primary_layout"
                          }
                          ${
                            child.children && child.children.length > 0
                              ? "pl-5 pr-3"
                              : ""
                          }
                        `}
                      >
                        {child.name}
                        {child.children && child.children.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 
                              ${
                                isChildActive
                                  ? "text-primary_layout group-hover/child:text-primary_layout"
                                  : "text-gray-400 group-hover/child:text-primary_layout"
                              }
                            `}
                          />
                        )}
                      </Link>

                      {/* Nested submenu */}
                      {child.children && child.children.length > 0 && (
                        <div
                          className={`absolute -top-2 left-full ml-0 hidden group-hover/child:block w-[230px] z-50`}
                        >
                          <div
                            className={`bg-white border border-gray-200 rounded-lg shadow-lg py-2`}
                          >
                            {child.children.map((subChild) => {
                              const isSubChildActive =
                                isItemOrChildrenActive(subChild);

                              return (
                                <div
                                  key={subChild.id}
                                  className="relative group/subchild"
                                >
                                  <Link
                                    href={subChild.link}
                                    className={`flex px-3 py-2 hover:bg-gray-100 rounded-md items-center justify-between
                                      ${
                                        isSubChildActive
                                          ? "text-primary_layout hover:text-primary_layout"
                                          : "text-black/90 hover:text-primary_layout"
                                      }
                                      ${
                                        subChild.children &&
                                        subChild.children.length > 0
                                          ? "pl-5 pr-3"
                                          : ""
                                      }
                                    `}
                                  >
                                    {subChild.name}
                                    {subChild.children &&
                                      subChild.children.length > 0 && (
                                        <ChevronRight
                                          className={`
                                            h-4 
                                            w-4 
                                            ${
                                              isSubChildActive
                                                ? "text-primary_layout group-hover/subchild:text-primary_layout"
                                                : "text-gray-400 group-hover/subchild:text-primary_layout"
                                            }
                                          `}
                                        />
                                      )}
                                  </Link>

                                  {/* Deepest submenu */}
                                  {subChild.children &&
                                    subChild.children.length > 0 && (
                                      <div
                                        className={`absolute top-0 left-full ml-2 hidden group-hover/subchild:block w-[250px] z-50`}
                                      >
                                        <div
                                          className={`bg-white border border-gray-200 rounded-lg shadow-lg p-2`}
                                        >
                                          {renderMenu(
                                            subChild.children,
                                            level + 1
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <nav className="hidden md:flex gap-x-4 items-center uppercase font-nav_h_layout font-bold text-sm">
      {renderMenu(menuItems)}
    </nav>
  );
}
