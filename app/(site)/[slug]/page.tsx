import { notFound } from "next/navigation";
import { formatDateVi } from "@/utils/date";
import { CalendarDays, CircleUser } from "lucide-react";
import {
  fetchAllCategories,
  fetchCategoryBySlug,
} from "../components/api/category";
import { fetchPost, getLatestPosts } from "../components/api/post";
import { PostType } from "../components/types/PostRes";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Sidebar from "../components/commons/Sidebar";
import PostCard from "../components/commons/PostCard";
import Pagination from "../components/layouts/Pagination";
import Post from "../components/commons/Post";
import { Metadata } from "next";

// Cấu hình ISR
export const revalidate = 300; // cache 5 phút

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

    for (const category of categories) {
      const post = await fetchPost(cleanSlug, category.id);
      if (post) {
        return {
          title: post.meta_title || post.name,
          description: post.meta_description || post.description || "",
          openGraph: {
            title: post.meta_title || post.name,
            description: post.meta_description || post.description || "",
            images: [
              {
                url: post.image_url || "/default-og.jpg",
              },
            ],
          },
        };
      }
    }
  } else {
    const category = await fetchCategoryBySlug(slug);
    if (category) {
      return {
        title: category.details.meta_title || category.details.name,
        description: category.details.meta_description || "",
        openGraph: {
          title: category.details.meta_title || category.details.name,
          description: category.details.meta_description || "",
        },
      };
    }
  }

  return {
    title: "Không tìm thấy nội dung",
    description: "Nội dung không tồn tại hoặc đã bị xóa.",
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
  const isPost = slug.endsWith(".html");

  const categories = await fetchAllCategories();
  const latestPosts = await getLatestPosts(5);

  if (!categories.length) return notFound();

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
          <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 z-0"></div>
          <div className="container mx-auto relative text-white z-10">
            <Breadcrumbs items={postData.breadcrumbs} />
            <h1 className="text-xl md:text-2xl font-bold">{postData.name}</h1>
            <div className="author-date flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CalendarDays size="15px" color="#E59B17" />
                {formatDateVi(postData.created_at)}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-100">
                <CircleUser size="15px" color="#E59B17" />
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

  const categoryData = await fetchCategoryBySlug(slug, page);
  if (!categoryData?.items?.data) return notFound();

  return (
    <>
      <section
        className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
        style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 z-0"></div>
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

// import { notFound } from "next/navigation";
// import {
//   fetchAllCategories,
//   fetchCategoryBySlug,
// } from "../components/api/category";
// import { fetchPost, getLatestPosts } from "../components/api/post";
// import Breadcrumbs from "../components/layouts/Breadcrumbs";
// import Pagination from "../components/layouts/Pagination";
// import { PostType } from "../components/types/PostRes";
// import { formatDateVi } from "@/utils/date";
// import { CalendarDays, CircleUser } from "lucide-react";
// import { Metadata } from "next";
// import Sidebar from "../components/commons/Sidebar";
// import PostCard from "../components/commons/PostCard";
// import Post from "../components/commons/Post";

// // 🧠 SEO metadata động cho từng slug
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const { slug } = params;
//   const isPost = slug.endsWith(".html");
//   const categories = await fetchAllCategories();

//   if (!categories.length) return {};

//   if (isPost) {
//     const cleanSlug = slug.replace(/\.html$/, "");
//     let postData: PostType | null = null;

//     for (const category of categories) {
//       const tempPost = await fetchPost(cleanSlug, category.id);
//       if (tempPost) {
//         const realCategoryId = tempPost.categories?.[0]?.id;
//         postData = realCategoryId
//           ? await fetchPost(cleanSlug, realCategoryId)
//           : tempPost;
//         break;
//       }
//     }

//     if (!postData) return {};

//     return {
//       title: postData.meta_title || postData.name,
//       description: postData.meta_description || postData.description,
//       openGraph: {
//         title: postData.meta_title || postData.name,
//         description: postData.meta_description || postData.description,
//         url: postData.slug || "",
//         images: [
//           {
//             url: postData.image_url || "",
//             alt: postData.name || "",
//           },
//         ],
//         type: "article",
//       },
//       alternates: {
//         canonical:
//           postData.canonical || `${process.env.NEXT_PUBLIC_URL}/${slug}`,
//       },
//     };
//   }

//   const categoryData = await fetchCategoryBySlug(slug, 1);
//   if (!categoryData?.details) return {};

//   return {
//     title: categoryData.details.meta_title || categoryData.details.name,
//     description:
//       categoryData.details.meta_description || categoryData.details.description,
//     openGraph: {
//       title: categoryData.details.name || "",
//       description: categoryData.details.description || "",
//       url: categoryData.details.slug || "",
//       images: [
//         {
//           url: categoryData.details.image_url || "",
//           alt: categoryData.details.name || "",
//         },
//       ],
//       type: "website",
//     },
//     alternates: {
//       canonical:
//         categoryData.details.canonical ||
//         `${process.env.NEXT_PUBLIC_URL}/${slug}`,
//     },
//   };
// }

// export default async function SlugPage({
//   params,
//   searchParams,
// }: {
//   params: { slug: string };
//   searchParams: { page?: string };
// }) {
//   const { slug } = params;
//   const page = Number(searchParams.page || 1);
//   const isPost = slug.endsWith(".html");
//   const categories = await fetchAllCategories();
//   const latestPosts = await getLatestPosts(5); // Lấy 5 bài viết mới nhất

//   if (!categories.length) return notFound();

//   // IN POSTS
//   if (isPost) {
//     const cleanSlug = slug.replace(/\.html$/, "");
//     // const postData = await fetchPost(slug, categories);

//     let postData: PostType | null = null;

//     for (const category of categories) {
//       const tempPost = await fetchPost(cleanSlug, category.id);
//       if (tempPost) {
//         const realCategoryId = tempPost.categories?.[0]?.id;

//         if (!realCategoryId) {
//           postData = tempPost;
//         } else {
//           postData = await fetchPost(cleanSlug, realCategoryId);
//         }
//         break;
//       }
//     }

//     if (!postData) return notFound();
//     return (
//       <>
//         <section
//           className="relative w-full bg-cover md:bg-center bg-left-top py-12 z-0"
//           style={{
//             backgroundImage: `url('${
//               postData.image_url || "/img-default.jpg"
//             }')`,
//           }}
//         >
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
//           <div className="container mx-auto relative text-white z-10">
//             <Breadcrumbs items={postData.breadcrumbs} />
//             <h1 className="text-xl md:text-2xl font-bold">{postData.name}</h1>
//             <div className="author-date flex items-center gap-3">
//               <span className="flex items-center gap-1 text-sm text-gray-100">
//                 <CalendarDays size="15px" color="#E59B17" />{" "}
//                 {formatDateVi(postData.created_at)}
//               </span>
//               <span className="flex items-center gap-1 text-sm text-gray-100">
//                 <CircleUser size="15px" color="#E59B17" />{" "}
//                 {postData.users?.name}
//               </span>
//             </div>
//           </div>
//         </section>
//         <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 py-10">
//           <aside className="md:w-[25%] w-full">
//             <Sidebar categories={categories} latestPosts={latestPosts} />
//           </aside>
//           <main className="md:w-[75%] w-full">
//             <Post post={postData} />
//           </main>
//         </div>
//       </>
//     );
//   }

//   // IN CATEGOGIES TYPE POST
//   const categoryData = await fetchCategoryBySlug(slug, page);
//   if (!categoryData?.items?.data) return notFound();

//   return (
//     <>
//       <section
//         className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-[59px] z-0"
//         style={{ backgroundImage: "url('/images/bg-head.jpg')" }}
//       >
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#40c543]/90 to-[#76c5c4]/70 transition-transform z-0"></div>
//         <div className="container mx-auto relative text-white z-10">
//           <Breadcrumbs items={categoryData.breadcrumbs} />
//           <h1 className="text-xl md:text-2xl font-bold">
//             {categoryData.details.name || "Danh mục"}
//           </h1>
//         </div>
//       </section>
//       <div className="container mx-auto flex flex-col-reverse md:flex-row gap-12 py-10">
//         <aside className="md:w-[25%] w-full">
//           <Sidebar categories={categories} />
//         </aside>
//         <main className="md:w-[75%] w-full space-y-6">
//           <PostCard
//             posts={categoryData.items.data}
//             categoryName={categoryData.details.name || ""}
//           />
//           <Pagination links={categoryData.items.links} />
//         </main>
//       </div>
//     </>
//   );
// }
