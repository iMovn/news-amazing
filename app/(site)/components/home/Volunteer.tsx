"use client";
import React, { useEffect, useState } from "react";
import { useCountUp } from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatItem {
  id: string;
  icon: string;
  count: number;
  label: string;
}

const itemVolunteer: StatItem[] = [
  {
    id: "volunteers",
    icon: "/icon/icon11.jpg",
    count: 2210,
    label: "VOLUNTEERS",
  },
  {
    id: "days",
    icon: "/icon/icon12.jpg",
    count: 210,
    label: "DAYS OF HELP",
  },
  {
    id: "saved",
    icon: "/icon/icon13.jpg",
    count: 957,
    label: "PEOPLE SAVED",
  },
  {
    id: "funds",
    icon: "/icon/icon14.jpg",
    count: 3010,
    label: "FUNDS COLLECTED",
  },
];

interface StatCardProps {
  item: StatItem;
}

const StatCard: React.FC<StatCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const countUpRef = React.useRef<HTMLSpanElement>(null);
  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: item.count,
    duration: 2.5,
    separator: ",",
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div
      className="flex flex-col items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="relative md:mb-3" whileHover={{ scale: 1.05 }}>
        <Image
          src={item.icon}
          alt={item.label}
          width={506}
          height={506}
          loading="lazy"
          quality={100}
          className="md:max-w-[80px] md:max-h-[80px] max-w-[60px] max-h-[60px]"
        />
      </motion.div>

      <div className="text-primary_layout font-nav_h_layout md:text-4xl text-2xl font-extrabold">
        <span ref={countUpRef} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-gray-500 font-nav_h_layout md:text-sm text-xs font-bold uppercase md:mt-2"
      >
        {item.label}
      </motion.div>
    </div>
  );
};

const Volunteer: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto md:pt-24 py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="md:text-3xl text-xl font-extrabold mb-2">
          EVERY DAY 99+{" "}
          <span className="text-primary_layout uppercase">VOLUNTEERS</span>
        </h2>
        <div className="relative flex justify-center">
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:mt-12">
        {itemVolunteer.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <div className="text-center text-gray-600 mt-12 max-w-3xl mx-auto">
        <p className="md:text-base text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          venenatis in eros etiaculis. Vivamus volutpat hendrerit elementum.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary_layout md:text-sm text-xs text-white md:px-7 px-3 py-2 flex rounded-md items-center font-bold"
        >
          Xem chi tiết
          <svg
            className="md:w-5 w-4 md:h-5 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default Volunteer;
