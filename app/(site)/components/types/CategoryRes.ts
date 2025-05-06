import { Breadcrumb } from "./common/Breadcrumb";

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active?: number;
  parent_id?: number;
  children?: Category[];
  description?: string;
  image_url?: string;
  meta_title?: string;
  meta_description?: string;
  canonical?: string;
}

export interface CategoryPost {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  image_url: string;
  description: string;
  categories: {
    id: number;
    name: string;
    pivot: {
      post_id: number;
      category_id: number;
    };
  }[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  links: PaginationLink[];
}

export interface Pagination<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface CategoryResponse {
  categories: Category[]; // Danh sách tất cả danh mục
  breadcrumbs: Breadcrumb[]; // Breadcrumb
  details: Category; // Danh mục hiện tại
  items: {
    data: CategoryPost[];
  } & PaginationMeta; // Danh sách bài viết thuộc danh mục + phân trang
}
