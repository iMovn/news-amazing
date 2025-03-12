import { notFound } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Post from "./components/Post";
import PostCard from "./components/PostCard";
import {
  fetchAllCategories,
  fetchCategoryBySlug,
} from "../components/api/category";
import { fetchPost, getLatestPosts } from "../components/api/post";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Pagination from "../components/layouts/Pagination";
import { PostType } from "../components/types/PostRes";
import { formatDateVi } from "@/utils/date";
import { CalendarDays, CircleUser } from "lucide-react";

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const { slug } = params;
  const page = Number(searchParams.page || 1);
  const isPost = slug.endsWith(".html");
  const categories = await fetchAllCategories();
  const latestPosts = await getLatestPosts(5); // Lấy 5 bài viết mới nhất

  if (!categories.length) return notFound();

  // IN POSTS
  if (isPost) {
    const cleanSlug = slug.replace(/\.html$/, "");
    // const postData = await fetchPost(slug, categories);

    let postData: PostType | null = null;

    for (const category of categories) {
      const tempPost = await fetchPost(cleanSlug, category.id);
      if (tempPost) {
        const realCategoryId = tempPost.categories?.[0]?.id;

        if (!realCategoryId) {
          postData = tempPost;
        } else {
          postData = await fetchPost(cleanSlug, realCategoryId);
        }
        break;
      }
    }

    if (!postData) return notFound();
    return (
      <>
        <section
          className="relative w-full bg-cover md:bg-center bg-left-top py-12 z-0"
          style={{
            backgroundImage: `url('${
              postData.image_url || "/img-default.jpg"
            }')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
          <div className="container mx-auto relative text-white z-10">
            <Breadcrumbs items={postData.breadcrumbs} />
            <h1 className="text-xl md:text-2xl font-bold">{postData.name}</h1>
            <div className="author-date flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CalendarDays size="15px" color="#E59B17" />{" "}
                {formatDateVi(postData.created_at)}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CircleUser size="15px" color="#E59B17" />{" "}
                {postData.users?.name}
              </span>
            </div>
          </div>
        </section>
        <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 py-10">
          <aside className="md:w-[25%] w-full">
            <Sidebar categories={categories} latestPosts={latestPosts} />
          </aside>
          <main className="md:w-[75%] w-full">
            <Post post={postData} />
          </main>
        </div>
      </>
    );
  }

  // IN CATEGOGIES TYPE POST
  const categoryData = await fetchCategoryBySlug(slug, page);
  if (!categoryData?.items?.data) return notFound();

  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
        style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
        <div className="container mx-auto relative text-white z-10">
          <Breadcrumbs items={categoryData.breadcrumbs} />
          <h1 className="text-xl md:text-2xl font-bold">
            {categoryData.details.name || "Danh mục"}
          </h1>
        </div>
      </section>
      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-12 py-10">
        <aside className="md:w-[25%] w-full">
          <Sidebar categories={categories} />
        </aside>
        <main className="md:w-[75%] w-full space-y-6">
          <PostCard
            posts={categoryData.items.data}
            categoryName={categoryData.details.name || ""}
          />
          <Pagination links={categoryData.items.links} />
        </main>
      </div>
    </>
  );
}
