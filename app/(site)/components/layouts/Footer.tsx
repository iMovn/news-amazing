"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { SettingsData } from "../types/setting";
import { fetchSiteSettings } from "../api/settings";
import { PostType } from "../types/PostRes";
import { fetchMenuFt } from "../api/menu";
import { MenuItem } from "../types/MenuRes";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { fetchGalleryNewsFt, fetchLastNewsFt } from "../api/footer";

export default function Footer() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [lastNews, setLastNews] = useState<PostType[]>([]);
  const [galleryNews, setGalleryNews] = useState<PostType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const getSettings = async () => {
      const data = await fetchSiteSettings();
      setSettings(data);
    };
    getSettings();
  }, []);

  // Fetch bài viết mới (5 bài)
  useEffect(() => {
    const fetchLastNews = async () => {
      const data = await fetchLastNewsFt();
      setLastNews(data);
    };
    fetchLastNews();
  }, []);

  // Fetch bài viết mới (12 bài)
  useEffect(() => {
    const fetchGalleryNews = async () => {
      const data = await fetchGalleryNewsFt();
      setGalleryNews(data);
    };
    fetchGalleryNews();
  }, []);

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
                href={settings?.company.link_map || "#"}
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
                    alt={news.name || "Post Image"}
                    loading="lazy"
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
            Thư viện ảnh
          </h3>
          <Divider />
          <div className="grid grid-cols-3 gap-2">
            {galleryNews.map((news) => (
              <GalleryImage
                key={news.id}
                src={news.image_url}
                alt={news.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 p-3 text-center text-sm text-white bg-primary_layout">
        <p>
          © {new Date().getFullYear()} All Rights Reserved.{" "}
          {settings?.company.copyright}
        </p>
      </div>
    </footer>
  );
}

// Tách Divider component
function Divider() {
  return (
    <div className="relative flex mb-4">
      <Image
        src="/images/divide.jpg"
        alt="divider"
        width={506}
        height={506}
        loading="lazy"
        quality={100}
        className="max-w-[50px] max-h-[50px]"
      />
    </div>
  );
}

// Tách GalleryImage để fix lỗi Dialog lặp ảnh
function GalleryImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image
          src={src || "/img-default.jpg"}
          alt={alt || "gallery-ft"}
          width={100}
          height={100}
          className="w-full h-16 object-cover rounded cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
        <DialogTitle>
          <VisuallyHidden>Ảnh xem chi tiết</VisuallyHidden>
        </DialogTitle>
        <DialogDescription>
          <VisuallyHidden>Hình ảnh mở rộng từ thư viện bài viết</VisuallyHidden>
        </DialogDescription>
        <Image
          src={src || "/img-default.jpg"}
          alt={alt || "gallery-ft"}
          width={800}
          height={600}
          className="w-full h-auto rounded"
        />
      </DialogContent>
    </Dialog>
  );
}
