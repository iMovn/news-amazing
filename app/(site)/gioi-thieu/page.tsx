import ViewAbout from "./view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu - HEPFU",
  description: "Giới thiệu HEPFU",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/gioi-thieu`,
  },
  openGraph: {
    title: "Giới thiệu HEPFU",
    description: "Giới thiệu HEPFU",
    type: "website",
    locale: "vi-VN",
    url: `${process.env.NEXT_PUBLIC_URL}/gioi-thieu`,
    siteName: "HEPFU",
    images: [
      {
        url: "/images/portfolio7.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "gioi-thieu-hepfu",
      },
    ],
  },
};

export default function AboutUs() {
  return <ViewAbout />;
}
