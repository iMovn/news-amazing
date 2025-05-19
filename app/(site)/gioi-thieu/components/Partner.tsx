"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";

const partners = [
  { id: 1, name: "3docean", logo: "/partners/partner1.jpg" },
  { id: 2, name: "activeden", logo: "/partners/partner2.jpg" },
  { id: 3, name: "audiojungle", logo: "/partners/partner3.jpg" },
  { id: 4, name: "codecanyon", logo: "/partners/partner4.jpg" },
  { id: 5, name: "codecanyon2", logo: "/partners/partner5.jpg" },
  { id: 6, name: "graphicriver", logo: "/partners/partner6.jpg" },
  { id: 7, name: "themeforest", logo: "/partners/partner7.jpg" },
  { id: 8, name: "photodune", logo: "/partners/partner3.jpg" },
];

const Partner = () => {
  useEffect(() => {
    const prevEl = document.querySelector(".partner-swiper-prev");
    const nextEl = document.querySelector(".partner-swiper-next");

    if (prevEl && nextEl) {
      prevEl.innerHTML = `<svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>`;
      nextEl.innerHTML = `<svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>`;
    }
  }, []);
  return (
    <section className="mt-6 mb-16 bg-white">
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
          Đối tác <span className="text-primary_layout">HEPF</span>
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
        className="max-w-6xl mx-auto relative"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          navigation={{
            nextEl: ".partner-swiper-next",
            prevEl: ".partner-swiper-prev",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide
              key={partner.id}
              className="flex justify-center items-center"
            >
              <div className="bg-[#F7F7F7] px-0 py-1 rounded w-full flex justify-center relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={256}
                  height={98}
                  loading="lazy"
                  quality={100}
                  className="max-w-[126px] max-h-[48px] object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <button className="partner-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-primary_layout hover:text-hover_layout transition-all" />
        <button className="partner-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-primary_layout hover:text-hover_layout transition-all" />
      </motion.div>
    </section>
  );
};

export default Partner;
