import { PostType } from "./PostRes";

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active?: number;
  parent_id?: number | null;
  meta_title?: string;
  meta_description?: string;
  description?: string;
  canonical?: string;
  image_url?: string;
  children?: Category[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface CategoryDetail {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  canonical?: string;
  image_url?: string;
  created_at: string;
  items?: {
    data: PostType[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  breadcrumbs?: Array<{
    name: string;
    slug: string;
    is_active: boolean;
  }>;
}

export interface CategoryWithPosts {
  details: CategoryDetail;
  items: {
    data: PostType[];
    current_page: number;
    last_page: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
  breadcrumbs: Array<{
    name: string;
    slug: string;
    is_active: boolean;
  }>;
}
