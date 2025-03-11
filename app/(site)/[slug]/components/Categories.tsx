import Link from "next/link";
import { CategoryPost } from "../../components/types/CategoryRes";

export default function Categories({
  category,
  posts,
}: {
  category: { name: string };
  posts: CategoryPost[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{category?.name}</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-sm">
              <Link
                href={`/${post.slug}.html`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {post.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Chưa có bài viết nào trong danh mục này.
        </p>
      )}
    </div>
  );
}
