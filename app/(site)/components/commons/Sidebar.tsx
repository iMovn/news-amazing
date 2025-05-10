import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "../types/CategoryRes";
import { LatestPost } from "../types/LatestPostRes";
import { formatDateVi } from "@/utils/date";

interface SidebarProps {
  categories: Category[];
  latestPosts?: LatestPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories, latestPosts = [] }) => {
  return (
    <div className="md:sticky top-20 space-y-5">
      {/* Danh mục */}
      <div className="bg-white p-4 rounded-lg shadow">
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
          {categories
            .filter((cat) => cat.is_active !== 0)
            .map((category) => (
              <li key={category.id}>
                <Link
                  href={`/${category.slug}`}
                  className="text-gray-700 hover:text-green-600 transition-colors block py-1"
                >
                  {category.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Bài viết mới nhất */}
      {latestPosts && latestPosts.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h5 className="text-base font-extrabold mb-2 text-primary_layout uppercase">
            Bài viết mới
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
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <div key={post.id} className="flex gap-3">
                <div className="flex-shrink-0 w-20 h-16 relative">
                  <Link href={`/${post.slug}.html`}>
                    <Image
                      src={post.image_url || "/img-default.jpg"}
                      alt={post.name}
                      fill
                      className="object-cover rounded"
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${post.slug}.html`}
                    className="text-sm font-medium text-gray-800 hover:text-green-600 line-clamp-2"
                  >
                    {post.name}
                  </Link>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDateVi(post.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
