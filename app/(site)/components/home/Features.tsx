"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../commons/VariantsMotion";

const features = [
  {
    icon: "/icon/iconf1.jpg",
    title: "ENERGY",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
  {
    icon: "/icon/iconf2.jpg",
    title: "SOLAR LIGHTS",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
  {
    icon: "/icon/iconf3.jpg",
    title: "ECO IDEAS",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
  {
    icon: "/icon/iconf4.jpg",
    title: "ORGANIC",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
  {
    icon: "/icon/iconf5.jpg",
    title: "RECYCLE",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
  {
    icon: "/icon/iconf6.jpg",
    title: "BIOLOGY",
    description: "Lorem ipsum dolor sit amet, con sect etur adipiscing elit.",
  },
];

export default function Features() {
  return (
    <section className="container mx-auto md:-mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 items-center">
        {/* Left Column */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
          className="__left_mobile"
        >
          <FeatureList items={features.slice(0, 3)} align="right" />
        </motion.div>

        {/* Center Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="hidden md:flex items-center justify-center"
        >
          <Image
            src="/images/leaf.jpg"
            alt="Background Leaf"
            width={327}
            height={327}
            loading="lazy"
            quality={100}
            className="object-cover"
          />
        </motion.div>

        {/* Right Column */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <FeatureList items={features.slice(3)} align="left" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureList({
  items,
  align,
}: {
  items: typeof features;
  align: "left" | "right";
}) {
  return (
    <div className={`flex flex-col md:gap-8 gap-2 text-${align}`}>
      {items.map((item, index) => (
        <FeatureItem key={index} item={item} align={align} />
      ))}
    </div>
  );
}

function FeatureItem({
  item,
  align,
}: {
  item: (typeof features)[0];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-4 ${
        align === "right" ? "md:flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Icon Box */}
      <div className="relative">
        <Image
          src={item.icon}
          alt={item.title}
          width={110}
          height={110}
          loading="lazy"
          quality={100}
          className="md:max-w-[80px] md:max-h-[80px] max-w-[50px] max-h-[50px]"
        />
      </div>

      {/* Text */}
      <div className="">
        <h3 className="font-bold md:text-lg text-sm">{item.title}</h3>
        <p className="text-gray-600 md:text-base text-xs">{item.description}</p>
      </div>
    </div>
  );
}
