// components/ui/Breadcrumbs.tsx
import Link from "next/link";
import { Breadcrumb } from "../types/common/Breadcrumb";

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className="text-sm mb-1">
      <ol className="flex flex-wrap items-center gap-1 text-gray-800">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={item.slug}
              className={item.is_active ? "text-gray-200" : "text-gray-800"}
            >
              {item.name}
            </Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
