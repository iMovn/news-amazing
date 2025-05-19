"use client";
import Image from "next/image";
import PortfolioItem from "./ui/PortfolioItem";
import fetchCategoryPortfolio from "../api/home/portfolio";
import { motion } from "framer-motion";

interface Portfolio {
  id: number;
  image_url: string;
  title: string;
  description: string;
  slug: string;
}

export default async function PortfolioGrid() {
  const portfolios = await fetchCategoryPortfolio();
  return (
    <section className="md:mt-8 mt-3 md:px-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
        viewport={{ once: false }}
      >
        <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center uppercase">
          Chương trình{" "}
          <span className="text-primary_layout uppercase">
            bảo vệ môi trường
          </span>
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.5,
            duration: 0.5,
          },
        }}
        viewport={{ once: false }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {portfolios.map((item: Portfolio) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
