"use client";
import { fetchMenu } from "../api/menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { MenuItem } from "../types/MenuRes";

// Hàm đệ quy lọc menu có is_active: 1
function filterActiveMenu(items: MenuItem[]): MenuItem[] {
  return items
    .filter((item) => item.is_active === 1)
    .map((item) => ({
      ...item,
      children: item.children ? filterActiveMenu(item.children) : [],
    }));
}

export default function DesktopNav() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function loadMenu() {
      const menuData = await fetchMenu();
      const activeMenu = filterActiveMenu(menuData);
      setMenuItems(activeMenu);
    }
    loadMenu();
  }, []);

  // Chuẩn hoá link để so sánh chính xác
  const normalizeLink = (link: string): string => {
    if (!link) return "/";
    return link.startsWith("/") ? link : `/${link}`;
  };

  // Kiểm tra link đang active (đệ quy qua children)
  const isLinkActive = (currentPath: string, item: MenuItem): boolean => {
    const itemLink = normalizeLink(item.link);
    if (currentPath === itemLink) return true;
    return (
      item.children?.some((child) => isLinkActive(currentPath, child)) ?? false
    );
  };

  const renderMenu = (items: MenuItem[], level = 0) => {
    return items.map((menu) => {
      const isActive = isLinkActive(pathname, menu);
      const hasChildren = menu.children && menu.children.length > 0;

      return (
        <div key={menu.id} className="relative group/parent">
          <Link
            href={menu.link}
            className={`p-1 transition-colors duration-200 focus:outline-none
              ${
                isActive
                  ? "text-primary_layout hover:text-primary_layout"
                  : "text-black/90 hover:text-primary_layout"
              }`}
          >
            {menu.name}
          </Link>

          {hasChildren && (
            <div className="absolute top-full pt-8 z-50 hidden group-hover/parent:block w-[230px]">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                {menu.children.map((child) => {
                  const isChildActive = isLinkActive(pathname, child);

                  return (
                    <div key={child.id} className="relative group/child">
                      <Link
                        href={child.link}
                        className={`flex px-3 py-2 items-center capitalize justify-between hover:bg-gray-50
                          ${
                            isChildActive
                              ? "text-primary_layout"
                              : "text-black/90 hover:text-primary_layout"
                          }
                          ${child.children?.length ? "pl-5 pr-3" : ""}
                        `}
                      >
                        {child.name}
                        {child.children?.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 ${
                              isChildActive
                                ? "text-primary_layout"
                                : "text-gray-400 group-hover/child:text-primary_layout"
                            }`}
                          />
                        )}
                      </Link>

                      {child.children?.length > 0 && (
                        <div className="absolute -top-2 left-full ml-0 hidden group-hover/child:block w-[230px] z-50">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                            {child.children.map((subChild) => {
                              const isSubChildActive = isLinkActive(
                                pathname,
                                subChild
                              );
                              return (
                                <div
                                  key={subChild.id}
                                  className="relative group/subchild"
                                >
                                  <Link
                                    href={subChild.link}
                                    className={`flex px-3 py-2 items-center justify-between capitalize hover:bg-gray-100 rounded-md
                                      ${
                                        isSubChildActive
                                          ? "text-primary_layout"
                                          : "text-black/90 hover:text-primary_layout"
                                      }
                                      ${
                                        subChild.children?.length
                                          ? "pl-5 pr-3"
                                          : ""
                                      }
                                    `}
                                  >
                                    {subChild.name}
                                    {subChild.children?.length > 0 && (
                                      <ChevronRight
                                        className={`h-4 w-4 ${
                                          isSubChildActive
                                            ? "text-primary_layout"
                                            : "text-gray-400 group-hover/subchild:text-primary_layout"
                                        }`}
                                      />
                                    )}
                                  </Link>

                                  {subChild.children?.length > 0 && (
                                    <div className="absolute top-0 left-full ml-2 hidden group-hover/subchild:block w-[250px] z-50">
                                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2">
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
