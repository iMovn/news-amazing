const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export async function getSeoMetadata() {
  const res = await fetch(
    `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
    { cache: "no-store" } // đảm bảo lấy mới mỗi lần render
  );

  const json = await res.json();
  if (!json.status) return null;

  const seo = json.data?.seo || {};

  return {
    title: seo?.meta_title || "",
    description: seo?.meta_description || "",
    authors: [{ name: seo?.meta_author || "Admin" }],
    icons: {
      icon: seo?.favicon || "/favicon.ico",
      shortcut: seo?.favicon || "/favicon.ico",
      apple: seo?.favicon || "/favicon.ico",
    },
    openGraph: {
      title: seo?.meta_og_title || "",
      description: seo?.meta_og_description || "",
      url: seo?.meta_og_url || "",
      siteName: seo?.meta_og_site_name || "",
      images: [
        {
          url: seo?.meta_og_image || "",
          alt: seo?.meta_og_image_alt || "",
        },
      ],
      // VALIDATE type để tránh lỗi
      type: ["website", "article", "profile"].includes(seo?.meta_og_type)
        ? seo.meta_og_type
        : "website",
      locale: seo?.meta_og_locale || "vi_VN",
    },
    alternates: {
      canonical: seo?.canonical || process.env.NEXT_PUBLIC_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.meta_og_title || "",
      description: seo?.meta_og_description || "",
      images: [seo?.meta_og_image || ""],
    },
    other: {
      "fb:app_id": seo?.meta_fb_app_id,
      "fb:admins": seo?.meta_fb_admins,
      canonical: seo?.canonical,
    },
    google_analytics: seo?.google_analytics,
    google_ads: seo?.google_ads,
    schema: seo?.schema,
  };
}
