import { Metadata } from "next";
import "./globals.css";
import { Mulish, Playfair_Display, Roboto } from "next/font/google";
import { getSeoMetadata } from "@/lib/getSeoMetadata";
import dynamic from "next/dynamic";

// Load fonts
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-mulish",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfairDisplay",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

// Metadata API (SEO động cho tất cả các trang)
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "Error domain 404"),
    title: seo?.title || "Trang mặc định",
    description: seo?.description || "",
    authors: seo?.authors,
    openGraph: seo?.openGraph,
    twitter: seo?.twitter,
    other: seo?.other,
    alternates: seo?.alternates,
    icons: seo?.icons,
  };
}

// Dynamic load scripts để tránh lỗi hydration
const SeoScripts = dynamic(() => import("@/lib/SeoScripts"), {
  ssr: false,
});

// Layout chính
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = await getSeoMetadata();

  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <head>{seo && <SeoScripts seo={seo} />}</head>
      <body
        className={`${mulish.variable} ${playfairDisplay.variable} ${roboto.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
