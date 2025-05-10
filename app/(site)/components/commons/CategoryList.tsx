import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Category } from "../types/CategoryRes";

// Đệ quy lọc các danh mục active
const filterActiveCategories = (categories: Category[]): Category[] => {
  return categories
    .filter((cat) => cat.is_active === 1)
    .map((cat) => ({
      ...cat,
      children: cat.children ? filterActiveCategories(cat.children) : [],
    }));
};

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const activeCategories = filterActiveCategories(categories);

  // Hàm kiểm tra slug hiện tại có đang là slug của danh mục hay không
  const isActive = (slug: string) => pathname === `/${slug}`;

  return (
    <div className="shadow-md rounded-md p-3 border-[1px]">
      <h5 className="text-base font-extrabold mb-2 text-primary_layout uppercase">
        Danh mục
      </h5>
      <div className="relative flex mb-3">
        <Image
          src={"/images/divide.jpg"}
          alt="divi"
          width={506}
          height={506}
          loading="lazy"
          quality={100}
          className="max-w-[50px] max-h-[50px]"
        />
      </div>
      <ul className="space-y-1">
        {activeCategories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/${cat.slug}`}
              className={`text-base hover:text-primary_layout ${
                isActive(cat.slug)
                  ? "text-primary_layout font-semibold"
                  : "text-gray-700"
              }`}
            >
              {cat.name}
            </Link>
            {/* Hiển thị children nếu có */}
            {/* {cat.children && cat.children.length > 0 && (
              <ul className="pl-4 mt-1 border-l border-gray-200 space-y-1">
                {cat.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/${child.slug}`}
                      className={`text-sm hover:text-blue-500 ${
                        isActive(child.slug) ? "text-red-600 font-semibold" : "text-gray-600"
                      }`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}
