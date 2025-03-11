import Image from "next/image";
import React from "react";

type Post = {
  id: number;
  img: string;
  title: string;
  created_at: string;
  description: string;
};

const itemPosts: Post[] = [
  {
    id: 1,
    img: "/posts/post1.jpg",
    title: "Suspendisse id velit lectu Phasellus ipsum",
    created_at: "09/03/2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis purus nulla, at rhoncus elit...",
  },
  {
    id: 2,
    img: "/posts/post2.jpg",
    title: "Eco environment green enviro is our mission",
    created_at: "06/03/2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis purus nulla, at rhoncus elit...",
  },
  {
    id: 3,
    img: "/posts/post3.jpg",
    title: "Protecting forests for future generations",
    created_at: "05/03/2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis purus nulla, at rhoncus elit...",
  },
  {
    id: 4,
    img: "/posts/post1.jpg",
    title: "Renewable energy and sustainability",
    created_at: "03/03/2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis purus nulla, at rhoncus elit...",
  },
];

const NewsPosts = () => {
  // Lấy 3 bài viết mới nhất
  const latestPosts = itemPosts.slice(0, 3);

  return (
    <div className="container mx-auto py-10">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center">
        NEWS <span className="text-primary_layout uppercase">POSTS</span>
      </h2>
      <div className="relative flex justify-center mb-9">
        <Image
          src={"/images/divide.jpg"}
          alt="divi"
          width={506}
          height={506}
          loading="lazy"
          quality={100}
          className="md:max-w-[90px] md:max-h-[90px] max-w-[80px] max-h-[80px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {latestPosts.map((post) => (
          <div
            key={post.id}
            className="group border rounded-md overflow-hidden shadow-md"
          >
            <div className="relative overflow-hidden">
              <Image
                src={post.img}
                alt={post.title}
                width={500}
                height={500}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary_layout bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="pt-1 text-xs text-primary_layout">
                {post.created_at}
              </p>
              <p className="text-base text-gray-600 mt-1">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPosts;
