"use client";

import Image from "next/image";

const contactInfo = [
  {
    image: "/contact/hotline.jpg",
    title: "Call Us At",
    lines: ["(123) 45 678", "+987 65 42"],
  },
  {
    image: "/contact/hotmail.jpg",
    title: "Mail Us At",
    lines: ["info@example.com", "eco@abc.com"],
  },
  {
    image: "/contact/hotlocal.jpg",
    title: "Our Location",
    lines: ["Salford road, east", "London, UK"],
  },
];

export default function Contact() {
  return (
    <section className="container py-12 bg-white">
      <h2 className="md:text-3xl text-xl font-extrabold mb-2 text-center uppercase">
        Thông tin <span className="text-primary_layout">liên hệ</span>
      </h2>
      <div className="relative flex justify-center mb-4">
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
      <p className="text-base text-center mb-10 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis
        in eros etiaculis. Vivamus volutpat hendrerit elementum.
      </p>
      <div className="md:flex justify-center gap-16 items-start">
        {/* Left Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex w-full gap-5">
              <div className="relative mt-2 flex items-center justify-center w-10 h-10">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={75}
                  height={75}
                  loading="lazy"
                  quality={100}
                  className="md:max-w-[50px] md:max-h-[50px] max-w-[60px] max-h-[60px]"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Form */}
        <div className="bg-[#F5F5F5] md:p-7 p-5 md:mt-0 mt-7 rounded-md shadow-md z-10">
          <h3 className="text-2xl font-extrabold text-gray-700 mb-2">
            Make A Donation
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vestibulum us in cursus rutrum. Ut vitae sagittis felis.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Địa chỉ email..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
              <input
                type="text"
                placeholder="Website..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Tiêu đề..."
              className="border p-2 text-sm rounded-md outline-none w-full"
            />
            <select className="border p-2 text-sm rounded-md outline-none w-full">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
            <button
              type="submit"
              className="text-sm bg-primary_layout hover:bg-lime-600 text-white px-6 py-2 rounded-sm font-medium focus-visible:none"
            >
              Donate now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
