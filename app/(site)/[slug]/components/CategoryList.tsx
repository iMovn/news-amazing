import Link from "next/link";
import { Category } from "../../components/types/CategoryRes";
import Image from "next/image";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
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
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/${cat.slug}`}
              className="text-base text-gray-700 hover:text-primary_layout"
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
                      className="text-sm text-gray-600 hover:text-blue-500"
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
