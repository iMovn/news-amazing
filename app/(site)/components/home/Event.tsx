import Image from "next/image";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Event = {
  id: number;
  img: string;
  created_at: string;
  title: string;
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    img: "/images/event1.jpg",
    created_at: "2025-02-19T08:18:27.000000Z",
    title:
      "Quyết định về việc công nhận kết quả tuyển dụng viên chức năm 2024 của Quỹ Bảo vệ môi trường",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus in cursus rutru tis felis. Nulla convallis neque ac sagittis porttitor. Suspendisse at orci ac diam tinciduntd et ligula. Cras sollicitudin eu...",
  },
  {
    id: 2,
    img: "/images/event2.jpg",
    created_at: "2025-01-20T10:30:00.000000Z",
    title:
      "Thay đổi thời gian tổ chức thi Vòng 2 – Vấn đáp kỳ tuyển dụng viên chức năm 2024 của Quỹ Bảo vệ môi trường",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus in cursus rutru tis felis. Nulla convallis neque ac sagittis porttitor. Suspendisse at orci ac diam tinciduntd et ligula. Cras sollicitudin eu...",
  },
  {
    id: 3,
    img: "/images/event3.jpg",
    created_at: "2025-01-15T14:45:15.000000Z",
    title:
      "Kết quả kiểm tra Phiếu đăng ký dự tuyển và triệu tập thí sinh đủ điều kiện dự tuyển Vòng 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus in cursus rutru tis felis. Nulla convallis neque ac sagittis porttitor. Suspendisse at orci ac diam tinciduntd et ligula. Cras sollicitudin eu...",
  },
  {
    id: 4,
    img: "/images/event1.jpg",
    created_at: "2025-03-10T09:00:00.000000Z",
    title:
      "Quyết định về việc công nhận kết quả tuyển dụng viên chức năm 2024 của Quỹ Bảo vệ môi trường",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum lacus in cursus rutru tis felis. Nulla convallis neque ac sagittis porttitor. Suspendisse at orci ac diam tinciduntd et ligula. Cras sollicitudin eu...",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return { day, month: `Th${month}` };
};

const EventSection = () => {
  const latestEvents = events.slice(0, 3);

  return (
    <div className="mx-auto md:w-[1000px] md:mt-12 px-4">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center">
        UPCOMING <span className="text-primary_layout uppercase">EVENTS</span>
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
      <div className="space-y-6">
        {latestEvents.map((event) => {
          const { day, month } = formatDate(event.created_at);
          return (
            <div
              key={event.id}
              className="group relative flex flex-col md:flex-row items-center overflow-hidden bg-white transition border-[1px]"
            >
              <div className="relative w-full md:w-1/3">
                <Image
                  src={event.img}
                  alt={event.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 text-primary_layout px-2 text-center border-[1px] border-primary_layout bg-white group-hover:bg-primary_layout group-hover:text-white rounded-md z-50">
                  <p className="text-base font-bold">{day}</p>
                  <p className="text-xs">{month}</p>
                </div>
                <div className="absolute inset-0 group-hover:bg-primary_layout bg-opacity-0 group-hover:bg-opacity-30 transition"></div>
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-lg font-bold group-hover:text-primary_layout">
                  {event.title}
                </h3>
                <p className="text-base text-gray-600 mt-2">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Button
          asChild
          className="w-auto px-6 py-2 mt-8 bg-primary_layout text-white font-semibold rounded-sm shadow-md hover:bg-[#7DA100] transition"
        >
          <Link href="#" className="flex items-center justify-center">
            Xem tất cả sự kiện <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventSection;
