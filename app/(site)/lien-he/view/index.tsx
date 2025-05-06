"use client";

import Link from "next/link";
import Gmap from "../components/Gmap";
import Contact from "../components/Contact";
import Partner from "../../gioi-thieu/components/Partner";

export default function ViewContactUs() {
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
                <Link href="/" className="">
                  Trang chủ
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li>Liên hệ</li>
            </ol>
          </nav>
          <h1 className="text-xl md:text-2xl font-bold">Liên hệ</h1>
        </div>
      </section>
      <Gmap />
      <Contact />
      <Partner />
    </>
  );
}
