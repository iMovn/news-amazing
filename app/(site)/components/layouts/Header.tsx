"use client";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";
import Image from "next/image";
import Logo from "@/public/hepfu-logo.png";

export default function Header() {
  return (
    <header className="head_cus relative w-full shadow-xl">
      <TopBar />
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={Logo}
            width={280}
            height={65}
            alt="logo-hepfu"
            quality={100}
            loading="lazy"
            className="md:w-72 w-auto h-auto"
          />
        </Link>
        {/* Menu Desktop */}
        <DesktopNav />
        {/* Menu Mobile */}
        <MobileNav />
      </div>
    </header>
  );
}
