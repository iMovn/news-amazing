import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/private/",
        "/*?*q=*", // Disallow search pages with query parameters
      ],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
