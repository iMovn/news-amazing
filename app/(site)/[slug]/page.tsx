import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import {
  fetchAllCategories,
  fetchCategoryBySlug,
} from "../components/api/category";
import { fetchPostBySlugOnly, getLatestPosts } from "../components/api/post";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Pagination from "../components/layouts/Pagination";
import { formatDateVi } from "@/utils/date";
import { CalendarDays, CircleUser } from "lucide-react";
import { unstable_cache } from "next/cache";
import { convertToLatestPosts } from "@/utils/postUtils";
import { PostType } from "../components/types/PostRes";

// Lazy load các components
const Sidebar = dynamic(() => import("../components/commons/Sidebar"), {
  loading: () => (
    <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
  ),
});
const PostCard = dynamic(() => import("../components/commons/PostCard"));
const PostComponent = dynamic(() => import("../components/commons/Post"));

// Cache helpers
const getCachedCategories = unstable_cache(
  async () => fetchAllCategories(),
  ["all-categories"],
  { revalidate: 3600 }
);

const getCachedLatestPosts = unstable_cache(
  async (count: number) => {
    const posts = await getLatestPosts(count);
    return convertToLatestPosts(posts);
  },
  ["latest-posts"],
  { revalidate: 900 }
);

// const getCachedRelatedPosts = unstable_cache(
//   async (categoryId: number, excludeSlug: string) => {
//     return await getRelatedPosts(categoryId, excludeSlug);
//   },
//   ["related-posts"],
//   { revalidate: 900 }
// );

// Cache bài viết theo slug với TTL 30 phút
const getCachedPost = unstable_cache(
  async (slug: string): Promise<PostType | null> => {
    return await fetchPostBySlugOnly(slug);
  },
  ["post-by-slug"],
  { revalidate: 1800 }
);

// Tạo metadata động
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const isPost = slug.endsWith(".html");

  if (isPost) {
    // Logic cho bài viết
    const cleanSlug = slug.replace(/\.html$/, "");
    const postData = await getCachedPost(cleanSlug);

    if (!postData)
      return {
        title: "Bài viết - Không tìm thấy",
        description: "Bài viết không tồn tại",
      };

    return {
      title: postData.meta_title || postData.name,
      description: postData.meta_description || postData.description || "",
      openGraph: {
        title: postData.meta_title || postData.name,
        description: postData.meta_description || postData.description || "",
        url: postData.slug || "",
        images: [
          {
            url: postData.image_url || "",
            alt: postData.name || "",
          },
        ],
        type: "article",
      },
      alternates: {
        canonical:
          postData.canonical || `${process.env.NEXT_PUBLIC_URL}/${slug}`,
      },
    };
  } else {
    // Logic cho danh mục
    const categoryData = await unstable_cache(
      async () => fetchCategoryBySlug(slug, 1),
      [`category-${slug}-metadata`],
      { revalidate: 1800 }
    )();

    if (!categoryData?.details)
      return {
        title: "Danh mục - Không tìm thấy",
        description: "Danh mục không tồn tại",
      };

    return {
      title: categoryData.details.meta_title || categoryData.details.name,
      description:
        categoryData.details.meta_description ||
        categoryData.details.description,
      openGraph: {
        title: categoryData.details.name || "",
        description: categoryData.details.description || "",
        url: categoryData.details.slug || "",
        images: [
          {
            url: categoryData.details.image_url || "",
            alt: categoryData.details.name || "",
          },
        ],
        type: "website",
      },
      alternates: {
        canonical:
          categoryData.details.canonical ||
          `${process.env.NEXT_PUBLIC_URL}/${slug}`,
      },
    };
  }
}

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

  // Tải song song dữ liệu chung
  const [categories, latestPosts] = await Promise.all([
    getCachedCategories(),
    getCachedLatestPosts(5),
  ]);

  if (!categories.length) return notFound();

  // RENDER POST
  if (isPost) {
    const cleanSlug = slug.replace(/\.html$/, "");

    // Lấy dữ liệu bài viết - related_posts đã có sẵn trong response từ API
    const postData = await getCachedPost(cleanSlug);

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
            <Breadcrumbs items={postData.breadcrumbs || []} />
            <h1 className="text-xl md:text-2xl font-bold">{postData.name}</h1>
            <div className="author-date flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CalendarDays size="15px" color="#E59B17" />{" "}
                {formatDateVi(postData.created_at)}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CircleUser size="15px" color="#E59B17" />{" "}
                {postData.users?.name || "Admin"}
              </span>
            </div>
          </div>
        </section>
        <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 py-10">
          <aside className="md:w-[25%] w-full">
            <Suspense
              fallback={
                <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
              }
            >
              <Sidebar categories={categories} latestPosts={latestPosts} />
            </Suspense>
          </aside>
          <main className="md:w-[75%] w-full">
            <Suspense
              fallback={
                <div className="h-96 bg-gray-200 animate-pulse rounded"></div>
              }
            >
              <PostComponent post={postData} />
            </Suspense>
          </main>
        </div>
      </>
    );
  }

  // RENDER CATEGORY
  const categoryData = await unstable_cache(
    async () => fetchCategoryBySlug(slug, page),
    [`category-${slug}-page-${page}`],
    { revalidate: 1800 }
  )();

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
          <Suspense
            fallback={
              <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
            }
          >
            <Sidebar categories={categories} latestPosts={latestPosts} />
          </Suspense>
        </aside>
        <main className="md:w-[75%] w-full space-y-6">
          <Suspense
            fallback={
              <div className="h-96 bg-gray-200 animate-pulse rounded"></div>
            }
          >
            <PostCard
              posts={categoryData.items.data}
              categoryName={categoryData.details.name || ""}
            />
            <Pagination links={categoryData.items.links} />
          </Suspense>
        </main>
      </div>
    </>
  );
}
