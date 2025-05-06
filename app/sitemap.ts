import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_URL;
  const currentDate = new Date();

  // Sitemap chính sẽ chỉ định danh sách các sitemap con
  return [
    {
      url: `${domain}/sitemaps/static-sitemap.xml`,
      lastModified: currentDate,
    },
    {
      url: `${domain}/sitemaps/posts-sitemap.xml`,
      lastModified: currentDate,
    },
    {
      url: `${domain}/sitemaps/categories-sitemap.xml`,
      lastModified: currentDate,
    },
  ];
}
