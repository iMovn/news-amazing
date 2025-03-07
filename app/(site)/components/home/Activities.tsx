import Image from "next/image";
import ShapeDivider from "./ShapeDivider";

const options = [
  { icon: "/icon/icon1.png", title: "Hỗ Trợ Tài Chính" },
  { icon: "/icon/icon2.png", title: "Nhận Uỷ Thác" },
  { icon: "/icon/icon3.png", title: "Ký Quỹ Bảo Vệ Môi Trường" },
];

export default function Activities() {
  return (
    <>
      <section className="relative bg-dark-pattern text-white md:py-12 py-7">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/services-back-img.png"
            alt="bg-hepfu"
            fill
            quality={100}
            loading="lazy"
            className="opacity-100 object-cover"
          />
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[30%,70%] items-center md:gap-10 gap-7 relative z-10">
          {/* Left Title */}
          <h2 className="text-xl md:text-4xl font-extrabold">
            <span className="text-primary_layout uppercase text-base">
              HEPF - Quỹ bảo vệ môi trường
            </span>
            <br />
            Công Tác Nghiệp Vụ
          </h2>

          {/* Right Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-3">
            {options.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* Icon Container */}
                {/* Icon */}
                <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-green-900/50 rounded-full shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40} // Mobile: 40px
                    height={40}
                    className="md:w-14 md:h-14 w-8 h-8 transition-transform hover:scale-110"
                  />
                </div>
                <span className="text-base md:text-xl md:font-semibold">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ShapeDivider />
    </>
  );
}
