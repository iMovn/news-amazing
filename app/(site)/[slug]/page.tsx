import Post from "./components/Post";
import PostCard from "./components/PostCard";
import {
  fetchAllCategories,
  fetchCategoryBySlug,
} from "../components/api/category";
import {
  fetchPost,
  fetchPostBySlugOnly,
  getLatestPosts,
} from "../components/api/post";
import { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Pagination from "../components/layouts/Pagination";
import { PostType } from "../components/types/PostRes";
import { formatDateVi } from "@/utils/date";
import { CalendarDays, CircleUser } from "lucide-react";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

// Cache fetchAllCategories với TTL 1 giờ
const getCachedCategories = unstable_cache(
  async () => fetchAllCategories(),
  ["all-categories"],
  { revalidate: 3600 } // 1 giờ
);

// Cache getLatestPosts với TTL 15 phút
const getCachedLatestPosts = unstable_cache(
  async (count: number) => getLatestPosts(count),
  ["latest-posts"],
  { revalidate: 900 } // 15 phút
);

// Kiểm tra nhanh nếu slug là post hay category
function isPostSlug(slug: string): boolean {
  return slug.endsWith(".html");
}

// Hàm tối ưu để lấy dữ liệu post dựa trên slug
const getPostBySlug = unstable_cache(
  async (slug: string) => {
    // Xóa phần .html từ slug nếu có
    const cleanSlug = slug.replace(/\.html$/, "");

    // Trước tiên thử lấy post mà không cần categoryId
    // Giả sử bạn tạo một API mới cho phép tìm post chỉ dựa vào slug
    const postData = await fetchPostBySlugOnly(cleanSlug);

    if (postData) {
      return postData;
    }

    // Fallback: Phương pháp cũ nếu API mới không có
    const categories = await getCachedCategories();

    for (const category of categories) {
      const tempPost = await fetchPost(cleanSlug, category.id);
      if (tempPost) {
        const realCategoryId = tempPost.categories?.[0]?.id;
        return realCategoryId
          ? await fetchPost(cleanSlug, realCategoryId)
          : tempPost;
      }
    }

    return null;
  },
  ["post-by-slug"],
  { revalidate: 1800 } // 30 phút cache
);

// SEO metadata động cho từng slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const isPost = slug.endsWith(".html");
  const categories = await fetchAllCategories();

  if (!categories.length) return {};

  if (isPost) {
    const cleanSlug = slug.replace(/\.html$/, "");
    let postData: PostType | null = null;

    for (const category of categories) {
      const tempPost = await fetchPost(cleanSlug, category.id);
      if (tempPost) {
        const realCategoryId = tempPost.categories?.[0]?.id;
        postData = realCategoryId
          ? await fetchPost(cleanSlug, realCategoryId)
          : tempPost;
        break;
      }
    }

    if (!postData) return {};

    return {
      title: postData.meta_title || postData.name,
      description: postData.meta_description || postData.description,
      openGraph: {
        title: postData.meta_title || postData.name,
        description: postData.meta_description || postData.description,
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
  }
  // Cache category data tối ưu
  const categoryData = await unstable_cache(
    async () => fetchCategoryBySlug(slug, 1),
    [`category-${slug}-page-1`],
    { revalidate: 1800 }
  )();
  if (!categoryData?.details) return {};

  return {
    title: categoryData.details.meta_title || categoryData.details.name,
    description:
      categoryData.details.meta_description || categoryData.details.description,
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

export default async function SlugPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const { slug } = params;
  const page = Number(searchParams.page || 1);

  // const isPost = slug.endsWith(".html");

  // const categories = await fetchAllCategories();
  // const latestPosts = await getLatestPosts(5); // Lấy 5 bài viết mới nhất
  // Tải song song categories và latest posts
  const [categories, latestPosts] = await Promise.all([
    getCachedCategories(),
    getCachedLatestPosts(5),
  ]);

  if (!categories.length) return notFound();

  // Xử lý hiển thị POST
  if (isPostSlug(slug)) {
    // Sử dụng hàm đã cache ở trên
    const postData = await getPostBySlug(slug);
    if (!postData) return notFound();
    // const cleanSlug = slug.replace(/\.html$/, "");
    // // const postData = await fetchPost(slug, categories);

    // let postData: PostType | null = null;

    // for (const category of categories) {
    //   const tempPost = await fetchPost(cleanSlug, category.id);
    //   if (tempPost) {
    //     const realCategoryId = tempPost.categories?.[0]?.id;

    //     if (!realCategoryId) {
    //       postData = tempPost;
    //     } else {
    //       postData = await fetchPost(cleanSlug, realCategoryId);
    //     }
    //     break;
    //   }
    // }

    // if (!postData) return notFound();
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

  // CATEGORIES PAGE - Cache theo page riêng biệt
  // const categoryData = await fetchCategoryBySlug(slug, page);
  // if (!categoryData?.items?.data) return notFound();
  const categoryDataFetcher = unstable_cache(
    async () => fetchCategoryBySlug(slug, page),
    [`category-${slug}-page-${page}`],
    { revalidate: 1800 }
  );

  const categoryData = await categoryDataFetcher();
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
