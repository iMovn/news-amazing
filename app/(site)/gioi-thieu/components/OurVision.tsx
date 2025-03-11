"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";

const features = [
  { id: 1, title: "Lorem ipsum dolor sit amet ipsum" },
  { id: 2, title: "Lorem ipsum dolor sit amet ipsum" },
  { id: 3, title: "Lorem ipsum dolor sit amet ipsum" },
];

export default function OurVision() {
  return (
    <section className="container flex flex-col md:flex-row items-center justify-between md:gap-0 gap-10 py-12">
      {/* Left Content */}
      <div className="md:w-[60%] space-y-4">
        <h2 className="text-xl md:text-2xl font-extrabold">OUR VISION</h2>
        <p className="text-lg font-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="space-y-4 text-gray-600 text-base leading-relaxed text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            a nunc dui. Curabitur digniss luctus nisi id euismod. Donec
            tincidunt diam vel nibh euismod tempus. Donec imperdiet rutru sapien
            posuere vehicula.
          </p>
          <p>
            Phasellus eu tincidunt orci, eu laoreet justo. Vivamus nec justo non
            nulla aliquam blandit. Cum sociis natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Interdum et malesuada
            fames ac ante ipsum primis in faucibus.
          </p>
        </div>

        {/* Features */}
        <div className="md:flex items-center gap-6 pt-4 md:space-y-0 space-y-3">
          {features.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="bg-lime-500 text-white p-2 rounded-sm shadow-md">
                <Leaf size={24} />
              </div>
              <span className="font-extrabold text-base md:text-base">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-[40%] flex justify-center">
        <Image
          src="/images/leaf-about.jpg" // Thay bằng ảnh bạn mong muốn
          alt="Vision Plant"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </section>
  );
}
