import axios from "axios";

import { Metadata } from "next";
import Sidebar from "../components/commons/Sidebar";
import PostCard from "../components/commons/PostCard";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Tin tức - HEPFU",
  description: "Blog - Tin Tức Mới Nhất HEPFU",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/tin-tuc`,
  },
  openGraph: {
    title: "Tin tức - HEPFU",
    description: "Blog - Tin Tức Mới Nhất HEPFU",
    type: "website",
    locale: "vi-VN",
    url: `${process.env.NEXT_PUBLIC_URL}/tin-tuc`,
    siteName: "HEPFU",
    images: [
      {
        url: "/images/portfolio2.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "tin-tuc-blog",
      },
    ],
  },
};

async function fetchAllData() {
  try {
    const res = await axios.get(
      `${apiUrl}/site/category?type=post&domain_id=11`
    );
    return {
      categories: res.data.data.categories,
      posts: res.data.data.items.data,
    };
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    return {
      categories: [],
      posts: [],
    };
  }
}

export default async function BlogDefault() {
  const { categories, posts } = await fetchAllData();

  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
        style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
        <div className="container mx-auto relative text-white z-10">
          <nav className="text-sm mb-1">
            <ol className="flex flex-wrap items-center gap-1 text-gray-800">
              <li className="flex items-center">
                <Link href="/" className="">
                  Trang chủ
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li>Tin tức</li>
            </ol>
          </nav>
          <h1 className="text-xl md:text-2xl font-bold">Tin tức</h1>
        </div>
      </section>
      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 py-10">
        <aside className="md:w-[25%] w-full">
          <Sidebar categories={categories} />
        </aside>
        <main className="md:w-[75%] w-full">
          <PostCard posts={posts} categoryName="Tin tức" />
        </main>
      </div>
    </>
  );
}
