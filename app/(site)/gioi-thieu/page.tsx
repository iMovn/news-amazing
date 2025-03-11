"use client";

import Link from "next/link";
import React from "react";
import OurVision from "./components/OurVision";
import VolunteerAbout from "./components/Volunteer";

export default function AboutUs() {
  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
        style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
        <div className="container mx-auto relative text-white z-10">
          <nav className="text-sm mb-1">
            <ol className="flex flex-wrap items-center gap-1 text-gray-800">
              <li className="flex items-center">
                <Link href="#" className="">
                  Trang chủ
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li>Giới thiệu</li>
            </ol>
          </nav>
          <h1 className="text-xl md:text-2xl font-bold">Giới thiệu</h1>
        </div>
      </section>
      <OurVision />
      <VolunteerAbout />
    </>
  );
}
