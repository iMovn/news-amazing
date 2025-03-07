"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/sliders/img3.jpg", "/sliders/img2.jpg", "/sliders/img1.jpg"];

export default function ImageSlider() {
  return (
    <div className="relative w-full">
      {/* Custom Navigation Buttons */}
      <button
        className="prev-slide absolute left-4 top-1/2 z-10 -translate-y-1/2 md:bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="next-slide absolute right-4 top-1/2 z-10 -translate-y-1/2 md:bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: ".prev-slide",
          nextEl: ".next-slide",
        }}
        pagination={{ clickable: true, renderBullet: () => "" }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1930}
              height={700}
              loading="lazy"
              quality={100}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
