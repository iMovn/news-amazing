import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCountUp } from "react-countup";
import { motion } from "framer-motion";

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

      <div className="text-white font-nav_h_layout md:text-4xl text-2xl font-extrabold">
        <span ref={countUpRef} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-white font-nav_h_layout md:text-sm text-xs font-bold uppercase md:mt-2"
      >
        {item.label}
      </motion.div>
    </div>
  );
};

const VolunteerAbout: React.FC = () => {
  return (
    <section
      className="volunteer-about relative w-full bg-cover md:bg-left-bottom bg-left-top py-16 md:mt-10 mt-10"
      style={{ backgroundImage: "url('/images/bg-donate.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black md:bg-opacity-40 bg-opacity-10 z-0"></div>
      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-[25%,75%] gap-12 items-center">
        {/* Left Column */}
        <div className="text-white z-10 md:text-left text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Recycle For All <br />
            <span className="text-primary_layout">Its Worth</span>
          </h2>
          <button className="text-base mt-3 px-6 py-2 border-[1px] border-white font-semibold rounded-sm hover:bg-white hover:text-gray-600 transition">
            Get a Quote
          </button>
        </div>

        {/* Right Column - Form */}
        <div className="md:p-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {itemVolunteer.map((item) => (
            <StatCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default VolunteerAbout;
