"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { SettingsData } from "../types/setting";
import { fetchSiteSettings } from "../api/settings";
import axios from "axios";
import { PostType } from "../types/PostRes";
import { fetchMenuFt } from "../api/menu";
import { MenuItem } from "../types/MenuRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

const galleryImages = [
  "/images/portfolio1.jpg",
  "/images/portfolio2.jpg",
  "/images/portfolio3.jpg",
  "/images/portfolio4.jpg",
  "/images/portfolio5.jpg",
  "/images/portfolio6.jpg",
  "/images/portfolio7.jpg",
  "/images/portfolio8.jpg",
  "/images/portfolio9.jpg",
];

export default function Footer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [lastNews, setLastNews] = useState<PostType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // fetch settings
  useEffect(() => {
    const getSettings = async () => {
      const data = await fetchSiteSettings();
      setSettings(data);
    };
    getSettings();
  }, []);

  // fetch bài viết mới
  useEffect(() => {
    const fetchLastNews = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=4`
        );
        setLastNews(res.data.data.data);
      } catch (error) {
        console.error("Error fetching last news:", error);
      }
    };
    fetchLastNews();
  }, []);

  // fetch menu footer
  useEffect(() => {
    const getMenu = async () => {
      const data = await fetchMenuFt();
      setMenuItems(data);
    };
    getMenu();
  }, []);

  return (
    <footer className="ft_cus relative bg-white pt-12 shadow-xl">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[30%,30%,10%,23%] gap-8 px-4">
        {/* Về chúng tôi */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Về Chúng Tôi
          </h3>
          <Divider />
          <p className="text-sm text-gray-600 mb-4 text-justify">
            {settings?.company.description}
          </p>
          <ul className="list-disc text-sm text-gray-600 space-y-1 ml-5">
            <li>
              <Link
                href={`${settings?.company.link_map}`}
                target="_blank"
                rel="nofollow"
                className="hover:text-hover_layout"
              >
                Địa chỉ: {settings?.company.address}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${settings?.company.email}`}
                target="_blank"
                className="hover:text-hover_layout"
              >
                Email: {settings?.company.email}
              </Link>
            </li>
            <li>
              <Link
                href={`tel:${settings?.company.phone}`}
                target="_blank"
                className="hover:text-hover_layout"
              >
                Hotline: {settings?.company.phone}
              </Link>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-gray-600">
            <Link href={settings?.company.fanpage || "#"} target="_blank">
              <Facebook className="w-5 h-5 hover:text-green-600" />
            </Link>
            <Link href={`tel:${settings?.company.phone}`}>
              <Phone className="w-5 h-5 hover:text-green-600" />
            </Link>
            <Link href={settings?.company.instagram || "#"} target="_blank">
              <Instagram className="w-5 h-5 hover:text-green-600" />
            </Link>
            <Link href={`mailto:${settings?.company.email}`}>
              <Mail className="w-5 h-5 hover:text-green-600" />
            </Link>
          </div>
        </div>

        {/* Bài viết mới */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Bài viết mới
          </h3>
          <Divider />
          <ul className="space-y-4">
            {lastNews.map((news) => (
              <li key={news.id}>
                <Link
                  href={`/${news.slug}.html`}
                  className="flex items-start gap-3"
                >
                  <Image
                    src={news.image_url || "/img-default.jpg"}
                    alt={news.name}
                    width={100}
                    height={100}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm text-gray-700 hover:text-hover_layout line-clamp-2">
                      {news.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(news.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Sitemap
          </h3>
          <Divider />
          <ul className="text-sm text-gray-600 space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="hover:text-hover_layout">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Ảnh đẹp
          </h3>
          <Divider />
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.map((img) => (
              <Dialog key={img}>
                <DialogTrigger asChild>
                  <Image
                    src={img}
                    alt="gallery-ft"
                    width={100}
                    height={100}
                    className="w-full h-16 object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
                  <Image
                    src={selectedImage ?? img}
                    alt="preview"
                    className="w-full h-auto rounded"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 p-3 text-center text-sm text-white bg-primary_layout">
        <p>
          © {new Date().getFullYear()} All Rights Reserved. Bản quyền thuộc về
          HEPF
        </p>
      </div>
    </footer>
  );
}

// Tách divider ra component phụ
function Divider() {
  return (
    <div className="relative flex mb-4">
      <Image
        src={"/images/divide.jpg"}
        alt="divi"
        width={506}
        height={506}
        loading="lazy"
        quality={100}
        className="max-w-[50px] max-h-[50px]"
      />
    </div>
  );
}
