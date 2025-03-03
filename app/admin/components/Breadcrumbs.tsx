"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean); // Loại bỏ các phần tử rỗng

  return (
    <nav className="flex items-center text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-pink-600">
        Dashboard
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <span key={href}>
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-pink-600">{path}</span>
            ) : (
              <Link href={href} className="hover:text-pink-600">
                {path}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;