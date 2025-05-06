import { NextResponse } from "next/server";
import { fetchAllCategories } from "../../components/api/category";

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_URL;

  try {
    // Lấy tất cả danh mục
    const categories = await fetchAllCategories();

    // Bắt đầu tạo XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Thêm mỗi danh mục vào sitemap
    for (const category of categories) {
      // Tính toán độ ưu tiên (priority) dựa trên cấp độ danh mục
      // Danh mục cha có priority cao hơn
      const priority = category.parent_id ? 0.8 : 0.9;

      // Thêm entry cho danh mục
      xml += `
      <url>
        <loc>${domain}/${category.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
      </url>`;

      // Xử lý danh mục con nếu có
      if (category.children && category.children.length > 0) {
        for (const child of category.children) {
          xml += `
          <url>
            <loc>${domain}/${child.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`;
        }
      }
    }
    // Kết thúc XML
    xml += `\n</urlset>`;

    // Trả về sitemap với header phù hợp
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating categories sitemap:", error);

    // Trả về sitemap trống nếu có lỗi
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
  }
}
