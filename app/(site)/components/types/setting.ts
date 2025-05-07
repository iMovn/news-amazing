export interface SEO {
  meta_title: string;
  canonical: string;
  meta_author: string;
  meta_description: string;
  meta_fb_app_id: string;
  meta_fb_admins: string;
  meta_og_locale: string;
  meta_og_title: string;
  meta_og_type: string;
  meta_og_url: string;
  meta_og_image: string;
  meta_og_image_alt: string;
  meta_og_site_name: string;
  meta_og_description: string;
  google_analytics: string;
  google_ads: string;
  google_search_console: string;
  schema: string;
}

export interface Content {
  content: string;
}

export interface Company {
  name: string;
  phone: string;
  email: string;
  hotline: string;
  address: string;
  zalo: string;
  copyright: string;
  description: string;
  fanpage: string;
  website: string;
  instagram: string;
  link_icon: string;
  map: string;
}

export interface SettingsData {
  seo: SEO;
  content: Content;
  company: Company;
  logo: string;
  favicon: string;
}
