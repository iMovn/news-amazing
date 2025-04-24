import axios from "axios";
import Sidebar from "../[slug]/components/Sidebar";
import PostCard from "../[slug]/components/PostCard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function fetchAllData() {
  try {
    const res = await axios.get(
      `${apiUrl}/site/category?type=post&domain_id=11`
    );
    return {
      categories: res.data.data.categories,
      posts: res.data.data.items.data,
    };
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    return {
      categories: [],
      posts: [],
    };
  }
}

export default async function BlogDefault() {
  const { categories, posts } = await fetchAllData();

  return (
    <div className="container mx-auto flex gap-6 py-10">
      <aside className="w-1/4">
        <Sidebar categories={categories} />
      </aside>
      <main className="w-3/4">
        <PostCard posts={posts} categoryName="Tin tức" />
      </main>
    </div>
  );
}
