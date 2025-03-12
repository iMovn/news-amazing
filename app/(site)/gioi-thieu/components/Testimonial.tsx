"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Dịch vụ tuyệt vời! Tôi rất hài lòng với cách làm việc chuyên nghiệp và tận tâm.",
    avatar: "/testimonial/testimonial1.jpg",
    name: "Nguyễn Văn A",
    job: "Doanh nhân",
  },
  {
    content:
      "Đội ngũ thân thiện, hỗ trợ nhanh chóng và hiệu quả. Sẽ giới thiệu cho bạn bè!",
    avatar: "/testimonial/testimonial2.jpg",
    name: "Trần Thị B",
    job: "Nhân viên Marketing",
  },
  {
    content:
      "Chất lượng dịch vụ vượt mong đợi, tôi sẽ quay lại sử dụng trong tương lai.",
    avatar: "/testimonial/testimonial3.jpg",
    name: "Lê Hoàng C",
    job: "Giám đốc kỹ thuật",
  },
  {
    content:
      "Một trải nghiệm rất tích cực. Mọi thứ được xử lý nhanh chóng và chuyên nghiệp.",
    avatar: "/testimonial/testimonial2.jpg",
    name: "Phạm Thị D",
    job: "Nhà thiết kế",
  },
];

export default function Testimonial() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat md:py-20 py-14 text-white"
      style={{ backgroundImage: "url('/testimonial/testimonial-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="md:text-3xl text-xl font-extrabold mb-12 text-center uppercase">
          Đối tác nói gì <span className="text-primary_layout">về HEPF</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center"
            >
              <Quote className="mx-auto text-blue-500 w-6 h-6 mb-4" />
              <p className="text-sm italic mb-6">{item.content}</p>
              <Image
                src={item.avatar}
                alt={item.name}
                width={60}
                height={60}
                className="mx-auto rounded-full mb-3"
              />
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.job}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
