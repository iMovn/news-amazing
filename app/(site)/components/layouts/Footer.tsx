"use client";
import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { SettingsData } from "../types/setting";
import { fetchSiteSettings } from "../api/settings";
import axios from "axios";
import { PostType } from "../types/PostRes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

const socialIcons = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Instagram, link: "https://instagram.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Mail, link: "mailto:info@example.com" },
];

const sitemapLinks = [
  "Giới thiệu",
  "Sản phẩm",
  "Sự kiện",
  "Tin tức - bài viết",
  "Dự án",
  "Liên hệ",
];

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

const Footer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // start get api settings
  const [settings, setSettings] = useState<SettingsData | null>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSiteSettings();
      setSettings(data);
    };
    getData();
  }, []);
  // end get api settings
  const [lastNews, setLastNews] = useState<PostType[]>([]);
  useEffect(() => {
    const fetchLastNews = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=4`
        );
        setLastNews(res.data.data.data); // do kết quả nằm trong data.data
      } catch (error) {
        console.error("Error fetching last news:", error);
      }
    };

    fetchLastNews();
  }, []);
  return (
    <footer className="ft_cus relative bg-white pt-12 shadow-xl">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[30%,30%,10%,23%] gap-8 px-4">
        {/* About */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Về Chúng Tôi
          </h3>
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
          <p className="text-sm text-gray-600 mb-4 text-justify">
            {settings?.company.description}
          </p>
          <ul className="list-disc text-sm text-gray-600 space-y-1 ml-5">
            <li>
              <Link
                href={`mailto:${settings?.company.email}`}
                target="_blank"
                className="hover:text-hover_layout"
              >
                {settings?.company.email}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${settings?.company.email}`}
                target="_blank"
                className="hover:text-hover_layout"
              >
                {settings?.company.email}
              </Link>
            </li>
            <li>
              <Link
                href={`tel:${settings?.company.phone}`}
                target="_blank"
                className="hover:text-hover_layout"
              >
                {settings?.company.phone}
              </Link>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-gray-600">
            {socialIcons.map(({ icon: Icon, link }) => (
              <Link key={link} href={link} target="_blank">
                <Icon className="w-5 h-5 hover:text-green-600 cursor-pointer" />
              </Link>
            ))}
          </div>
        </div>

        {/* Last News */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Bài viết mới
          </h3>
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
          <ul className="space-y-4">
            {lastNews.map((news) => (
              <li key={news.id} className="flex items-start gap-3 mb-3">
                <Link
                  href={`/${news.slug}.html`}
                  className="flex items-start gap-3"
                >
                  <Image
                    src={news.image_url || "/img-default.jpg"}
                    width={100}
                    height={100}
                    alt={news.name}
                    className="w-12 h-12 object-cover rounded"
                  />

                  <div>
                    <p className="text-sm text-gray-700 leading-snug hover:text-hover_layout line-clamp-2">
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
          <ul className="text-sm text-gray-600 space-y-1">
            {sitemapLinks.map((link) => (
              <li key={link} className="hover:text-hover_layout cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-lg font-extrabold mb-3 uppercase text-primary_layout">
            Ảnh đẹp
          </h3>
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
        <p className="text-sm">
          © {new Date().getFullYear()}, All Right Reserved. Bản quyền thuộc về
          HEPF
        </p>
      </div>
    </footer>
  );
};

export default Footer;
