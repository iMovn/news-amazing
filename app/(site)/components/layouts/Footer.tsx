"use client";
import React, { useState } from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const aboutInfo = {
  description:
    "Ngày 03 tháng 07 năm 2013, Ủy ban nhân dân thành phố Hồ Chí Minh ban hành Quyết định số 3588/QĐ-UBND về thành lập Quỹ Bảo vệ môi trường Thành phố Hồ Chí Minh trực thuộc Sở Tài nguyên và Môi trường trên cơ sở hợp nhất Quỹ Tái chế chất thải thành phố Hồ Chí Minh và Quỹ Hỗ trợ giảm thiểu ô nhiễm công nghiệp - tiểu thủ công nghiệp thành phố Hồ Chí Minh.",
  contacts: [
    {
      label: "info@hepfu.vn",
      href: "mailto:info@hepfu.vn",
    },
    {
      label: "63 Lý Tự Trọng, Quận 1, TP.HCM",
      href: "https://maps.google.com/?q=63+Lý+Tự+Trọng,+Quận+1,+TP.HCM",
    },
    {
      label: "+84-8-39151980",
      href: "tel:+84839151980",
    },
  ],
};

const socialIcons = [
  { icon: Facebook, link: "https://facebook.com" },
  { icon: Instagram, link: "https://instagram.com" },
  { icon: Twitter, link: "https://twitter.com" },
  { icon: Mail, link: "mailto:info@example.com" },
];

const lastNews = [
  {
    id: 1,
    img: "/posts/post1.jpg",
    title: "Suspendisse id velit lectus Phasellus ipsum",
    date: "13/01/2022",
    href: "#",
  },
  {
    id: 2,
    img: "/posts/post2.jpg",
    title: "Suspendisse id velit lectus Phasellus ipsum",
    date: "13/01/2022",
    href: "#",
  },
  {
    id: 3,
    img: "/posts/post3.jpg",
    title: "Eco environment green enviro is our mission",
    date: "13/01/2022",
    href: "#",
  },
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
  return (
    <footer className="bg-white pt-12 border-t border-gray-200">
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
            {aboutInfo.description}
          </p>
          <ul className="list-disc text-sm text-gray-600 space-y-1 ml-5">
            {aboutInfo.contacts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target="_blank"
                  className="hover:text-hover_layout"
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
                <Link href={news.href}>
                  <Image
                    src={news.img}
                    width={100}
                    height={100}
                    alt="news"
                    className="w-12 h-12 object-cover rounded"
                  />
                </Link>
                <div>
                  <p className="text-sm text-gray-700 leading-snug hover:text-hover_layout">
                    {news.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                </div>
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
                  <img
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
