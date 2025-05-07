"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Portfolio {
  id: number;
  image_url: string;
  title: string;
  description: string;
  slug: string;
}

export default function PortfolioItem({ item }: { item: Portfolio }) {
  return (
    <motion.div className="relative group overflow-hidden cursor-pointer">
      <Link href={`/${item.slug}.html`}>
        <Image
          src={item.image_url}
          alt={item.title}
          width={400}
          height={300}
          loading="lazy"
          quality={100}
          className="md:w-full md:h-full w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <motion.div className="hidden absolute inset-0 bg-primary_layout bg-opacity-80 md:flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="md:text-2xl text-xl font-bold text-center px-4">
            {item.title}
          </h3>
          <p className="text-base text-center px-4 mt-2">{item.description}</p>
          <button className="mt-7 px-4 py-2 bg-white rounded-sm text-primary_layout font-bold font-nav_h_layout text-xs uppercase">
            Xem thêm
          </button>
        </motion.div>

        {/* Hiển thị tiêu đề và mô tả trên mobile */}
        <div className="md:hidden mt-4">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
