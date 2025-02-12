import { Category } from "./category";

export interface Post {
  name: string;
  slug: string;
  description: string;
  content: string;
  category: Category | null;
  status: boolean;
}
