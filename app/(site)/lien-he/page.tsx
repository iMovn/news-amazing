import { Metadata } from "next";
import ViewContactUs from "./view";

export const metadata: Metadata = {
  title: "Liên Hệ - HEPFU",
  description: "Liên Hệ HEPFU",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/lien-he`,
  },
  openGraph: {
    title: "Liên Hệ - HEPFU",
    description: "Liên Hệ HEPFU",
    type: "website",
    locale: "vi-VN",
    url: `${process.env.NEXT_PUBLIC_URL}/lien-he`,
    siteName: "HEPFU",
    images: [
      {
        url: "/images/portfolio3.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: "lien-he-hepfu",
      },
    ],
  },
};

export default function ContactUs() {
  return <ViewContactUs />;
}
