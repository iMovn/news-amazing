"use client";

import Image from "next/image";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Column */}
        <FeatureList items={features.slice(0, 3)} align="right" />

        {/* Center Background */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/leaf.jpg"
            alt="Background Leaf"
            width={327}
            height={327}
            loading="lazy"
            quality={100}
            className="object-cover"
          />
        </div>

        {/* Right Column */}
        <FeatureList items={features.slice(3)} align="left" />
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
    <div className={`flex flex-col gap-8 text-left md:text-${align}`}>
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
          className="w-auto h-auto max-w-[110px] max-h-[110px]"
        />
      </div>

      {/* Text */}
      <div className="">
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}
