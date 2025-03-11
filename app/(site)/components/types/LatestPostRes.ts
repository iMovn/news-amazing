export interface LatestPost {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  created_at: string;
  categories: {
    id: number;
    name: string;
    slug: string;
    pivot: {
      post_id: number;
      category_id: number;
    };
  }[];
  users: {
    id: number;
    name: string;
  };
}

export interface LatestPostResponse {
  data: LatestPost[];
}
