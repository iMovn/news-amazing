"use client";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";
import Image from "next/image";
import Logo from "@/public/hepfu-logo.png";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export default function Header() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
          { cache: "no-store" }
        );
        const json = await res.json();
        if (json.status) {
          setLogoUrl(json.data?.logo || null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy logo:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <header className="head_cus relative w-full shadow-xl">
      <TopBar />
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logoUrl || Logo}
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
