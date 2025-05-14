"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchNewsPostHome } from "../api/footer";
import { PostType } from "../types/PostRes";
import Link from "next/link";

const NewsPosts = () => {
  const [lastNews, setLastNews] = useState<PostType[]>([]);

  // Fetch bài viết mới (5 bài)
  useEffect(() => {
    const fetchNewsPost = async () => {
      const data = await fetchNewsPostHome();
      setLastNews(data);
    };
    fetchNewsPost();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center">
        NEWS <span className="text-primary_layout uppercase">POSTS</span>
      </h2>
      <div className="relative flex justify-center mb-9">
        <Image
          src={"/images/divide.jpg"}
          alt="divi"
          width={506}
          height={506}
          loading="lazy"
          quality={100}
          className="md:max-w-[90px] md:max-h-[90px] max-w-[80px] max-h-[80px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {lastNews.map((post) => (
          <div
            key={post.id}
            className="group border rounded-md overflow-hidden shadow-md"
          >
            <Link href={`/${post.slug}.html`}>
              <div className="relative overflow-hidden">
                <Image
                  src={post.image_url || "/img-default.jpg"}
                  alt={post.name || "Post Image"}
                  loading="lazy"
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary_layout bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{post.name || ""}</h3>
                <p className="pt-1 text-xs text-primary_layout">
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </p>
                <p className="text-base text-gray-600 mt-1">
                  {post.description || ""}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPosts;
