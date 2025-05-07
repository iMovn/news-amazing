import { NextResponse } from "next/server";

export async function GET() {
  const DOMAIN = process.env.NEXT_PUBLIC_URL;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
  try {
    // Gọi API lấy danh sách bài viết
    const res = await fetch(
      `${API_BASE_URL}/site/posts?limit=1000&domain_id=${DOMAIN_ID}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch failed:", res.status, errorText);
      throw new Error("Failed to fetch posts from API");
    }

    const json = await res.json();

    if (!json?.data?.data || !Array.isArray(json.data.data)) {
      throw new Error("Invalid API response");
    }
    // Lấy danh sách bài viết từ phản hồi API
    const posts = json.data.data;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const post of posts) {
      const loc = `${DOMAIN}/${post.slug}.html`;
      const lastmod = new Date(post.created_at).toISOString();

      xml += `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`;
    }

    xml += `\n</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
  }
}
