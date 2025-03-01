export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number;
  is_active: number;
  created_at: string;
  children?: Category[];
  level: number;
}
