import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_URL;
  const currentDate = new Date().toISOString();

  // Tạo XML cho các trang tĩnh
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${domain}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${domain}/gioi-thieu</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${domain}/lien-he</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${domain}/tin-tuc</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>

    <url>
      <loc>${domain}/search</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
