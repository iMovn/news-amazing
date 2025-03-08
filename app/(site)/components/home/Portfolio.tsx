"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const portfolios = [
  {
    id: 1,
    image: "/images/portfolio1.jpg",
    title: "Những cách bảo vệ môi trường đơn giản nhất",
    description:
      "Môi trường đã, đang và sẽ ảnh hưởng trực tiếp đến đời sống của chúng...",
  },
  {
    id: 2,
    image: "/images/portfolio2.jpg",
    title: "Đẩy mạnh tuyên truyền việc bảo vệ động vật hoang dã",
    description:
      "Ban Tuyên giáo Trung ương vừa ban hành Hướng dẫn tăng cường công tác tuyên truyền...",
  },
  {
    id: 3,
    image: "/images/portfolio3.jpg",
    title: "Sự cần thiết phải giáo dục vệ sinh cá nhân cho trẻ",
    description:
      "Thường xuyên giáo dục thói quen vệ sinh: Muốn gây thói quen cho trẻ không...",
  },
  {
    id: 4,
    image: "/images/portfolio4.jpg",
    title: "Sửa điều kiện nuôi các loài động vật hoang dã nguy cấp",
    description:
      "(HNM) Ngày 22-9-2021, Chính phủ ban hành Nghị định số 84/2021/NĐ-CP sửa đổi, bổ...",
  },
  {
    id: 5,
    image: "/images/portfolio5.jpg",
    title: "Nâng cao nhận thức bảo vệ động vật hoang dã",
    description:
      "(HNM) Trung tâm Cứu hộ động vật hoang dã trực thuộc Sở NN&PTNT Hà...",
  },
  {
    id: 6,
    image: "/images/portfolio6.jpg",
    title: "Bảo vệ môi trường và hợp lý nguồn tài nguyên thiên nhiên",
    description:
      "Ngày 29/10, Sở Tài nguyên và Môi trường tổ chức tập huấn về bảo vệ...",
  },
  {
    id: 7,
    image: "/images/portfolio7.jpg",
    title:
      "Khai thác và bảo vệ tài nguyên thiên nhiên theo tư tưởng Hồ Chí Minh",
    description:
      "Chủ tịch Hồ Chí Minh là lãnh tụ vĩ đại của dân tộc Việt Nam,...",
  },
  {
    id: 8,
    image: "/images/portfolio8.jpg",
    title: "Bảo vệ tài nguyên thiên nhiên là sứ mệnh của chúng tôi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis purusla, at rhoncus elit non....",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="md:mt-8 mt-3 md:px-4 px-4">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center">
        OUR <span className="text-primary_layout uppercase">PORTFOLIOS</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {portfolios.map((item) => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function PortfolioItem({ item }: { item: (typeof portfolios)[0] }) {
  return (
    <motion.div className="relative group overflow-hidden cursor-pointer">
      <Image
        src={item.image}
        alt={item.title}
        width={400}
        height={300}
        loading="lazy"
        quality={100}
        className="md:w-full md:h-full w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <motion.div className="hidden absolute inset-0 bg-primary_layout bg-opacity-80 md:flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="md:text-2xl text-xl font-bold text-center px-4">
          {item.title}
        </h3>
        <p className="text-base text-center px-4 mt-2">{item.description}</p>
        <button className="mt-7 px-4 py-2 bg-white rounded-sm text-primary_layout font-bold font-nav_h_layout text-xs uppercase">
          Xem thêm
        </button>
      </motion.div>

      {/* Hiển thị tiêu đề và mô tả trên mobile */}
      <div className="md:hidden mt-4">
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
      </div>
    </motion.div>
  );
}
