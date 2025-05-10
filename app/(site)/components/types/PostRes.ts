export interface RelatedPost {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_url: string;
  views?: number;
  favorites?: number;
  video?: string | null;
  description?: string | null;
  created_at: string;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    pivot?: {
      post_id: number;
      category_id: number;
    };
  }>;
}

export interface PostType {
  id: number;
  name: string;
  slug: string;
  category_id?: number;
  description?: string | null;
  content?: string | null;
  views?: number;
  favorites?: number;
  video?: string | null;
  time?: string | null;
  toc?: string;
  image: string;
  image_url: string;
  status?: number;
  user_id?: number;
  domain_id?: number;
  created_at: string;
  updated_at?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical?: string | null;
  related_posts?: RelatedPost[];
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    pivot?: {
      post_id: number;
      category_id: number;
    };
  }>;
  breadcrumbs?: Array<{
    name: string;
    slug: string;
    is_active: boolean;
  }>;
  users?: {
    id: number;
    name: string;
    email?: string;
  };
  domains?: {
    id: number;
    name: string;
  };
}
