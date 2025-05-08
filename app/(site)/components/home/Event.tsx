import Image from "next/image";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import fetchCategoryEvent from "../api/home/event";
import DOMPurify from "isomorphic-dompurify";

interface Event {
  id: number;
  image_url: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
}

const domainUrl = process.env.NEXT_PUBLIC_URL;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return { day, month: `Th${month}` };
};

export default async function EventSection() {
  // const latestEvents = events.slice(0, 3);

  const events = await fetchCategoryEvent();

  return (
    <div className="mx-auto md:w-[1000px] md:mt-12 mt-10 px-4">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center uppercase">
        Văn bản <span className="text-primary_layout uppercase">pháp lý</span>
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
        {events.map((item: Event) => {
          const { day, month } = formatDate(item.created_at);
          return (
            <Link href={`/${item.slug}.html`} key={item.id}>
              <div className="group relative flex flex-col md:flex-row items-center overflow-hidden bg-white transition border-[1px] mb-4">
                <div className="relative w-full md:w-1/3">
                  <Image
                    src={item.image_url}
                    alt={item.title}
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
                    {item.title}
                  </h3>

                  <div
                    className="text-base text-gray-600 mt-2 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.description || ""),
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="text-center">
        <Button
          asChild
          className="w-auto px-6 py-2 mt-8 bg-primary_layout text-white font-semibold rounded-sm shadow-md hover:bg-[#7DA100] transition"
        >
          <Link
            href={`${domainUrl}/van-ban-phap-quy`}
            className="flex items-center justify-center"
          >
            Xem nhiều hơn <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
