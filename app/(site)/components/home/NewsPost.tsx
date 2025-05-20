"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { fetchNewsPostHome } from "../api/footer";
import { PostType } from "../types/PostRes";
import Link from "next/link";
import { motion } from "framer-motion";

const NewsPosts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lastNews, setLastNews] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize hover handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Fetch bài viết mới (4 bài)
  useEffect(() => {
    const fetchNewsPost = async () => {
      setIsLoading(true);
      try {
        const data = await fetchNewsPostHome();
        setLastNews(data);
      } catch (error) {
        console.error("Failed to fetch news posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsPost();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.3,
            duration: 0.4,
          },
        }}
        viewport={{ once: true }}
      >
        <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center uppercase">
          Blog <span className="text-primary_layout uppercase">Tin tức</span>
        </h2>
        <div className="relative flex justify-center mb-9">
          <Image
            src={"/images/divide.jpg"}
            alt="divi"
            width={90}
            height={90}
            loading="lazy"
            className="md:max-w-[90px] md:max-h-[90px] max-w-[80px] max-h-[80px]"
          />
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative w-full h-96 rounded-lg bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.4,
              staggerChildren: 0.1,
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {lastNews.map((blog, index) => (
            <Link href={`/${blog.slug}.html`} key={blog.id}>
              <div
                className="block h-full will-change-transform"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="group relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
                  {/* Image overlay - Using opacity for better performance */}
                  <div
                    className="absolute inset-0 bg-black z-10 transition-opacity duration-300 ease-out"
                    style={{
                      opacity: hoveredCard === index ? 0.5 : 0.3,
                    }}
                  ></div>

                  {/* Background image with Next.js Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={blog.image_url || "/img-default.jpg"}
                      alt={blog.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover will-change-transform transition-transform duration-500 ease-out"
                      style={{
                        transform:
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAA1dvJgAAAABJRU5ErkJggg=="
                    />
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-teal-400 text-sm text-white px-4 py-1 rounded-md font-medium">
                      {blog.categories && blog.categories.length > 0
                        ? blog.categories[0].name
                        : "Tin tức"}
                    </span>
                  </div>

                  {/* Date and title - Using transform for better performance */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-transform duration-300 ease-out will-change-transform"
                    style={{
                      transform:
                        hoveredCard === index
                          ? "translateY(-4.5rem)"
                          : "translateY(0)",
                    }}
                  >
                    <p className="text-white text-sm mb-2">
                      {new Date(blog.created_at).toLocaleDateString("vi-VN")}
                    </p>
                    <h3 className="text-white text-xl font-bold leading-tight">
                      {blog.name}
                    </h3>
                  </div>

                  {/* Description (visible on hover) - Using transform and opacity for better performance */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-300 ease-out delay-75 will-change-transform"
                    style={{
                      opacity: hoveredCard === index ? 1 : 0,
                      transform:
                        hoveredCard === index
                          ? "translateY(0)"
                          : "translateY(100%)",
                    }}
                  >
                    <p className="text-white text-sm mt-2 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {!isLoading && lastNews.length > 4 && (
        <div className="mt-8 text-center">
          <Link
            href="/tin-tuc"
            className="inline-block px-6 py-2 bg-primary_layout text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsPosts;
