"use client";

export default function SeoScripts({
  seo,
}: {
  seo: {
    google_analytics?: string;
    google_ads?: string;
    schema?: string;
  };
}) {
  return (
    <>
      {seo.google_analytics && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.google_analytics }}
        />
      )}
      {seo.google_ads && (
        <script dangerouslySetInnerHTML={{ __html: seo.google_ads }} />
      )}
      {seo.schema && (
        <script
          type="application/ld+json"
          className="yoast-schema-graph"
          dangerouslySetInnerHTML={{ __html: seo.schema }}
        />
      )}
    </>
  );
}
