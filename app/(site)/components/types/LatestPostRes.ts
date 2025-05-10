export interface LatestPost {
  id: number;
  name: string;
  slug: string;
  image?: string;
  image_url: string;
  created_at: string;
  description?: string | null;
  categories: {
    id: number;
    name: string;
    slug: string;
    pivot: {
      post_id: number;
      category_id: number;
    };
  }[];
}

export interface LatestPostResponse {
  data: LatestPost[];
}
