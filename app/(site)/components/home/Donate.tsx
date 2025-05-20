"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { postContact } from "../api/formContact";
import { fadeIn } from "../commons/VariantsMotion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().trim().required("Vui lòng nhập họ tên"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email không đúng định dạng"),
  phone: yup
    .string()
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  message: yup.string().trim().required("Vui lòng nhập nội dung"),
});
const domainUrl = process.env.NEXT_PUBLIC_URL;
export default function Donate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [popup, setPopup] = useState<{
    open: boolean;
    success: boolean;
    message: string;
  }>({ open: false, success: false, message: "" });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await postContact(data);
      setPopup({
        open: true,
        success: true,
        message: "Thông tin của bạn đã được gửi thành công!",
      });
      reset();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setPopup({
        open: true,
        success: false,
        message:
          error?.response?.data?.message || "Gửi thất bại. Vui lòng thử lại.",
      });
    }
  };

  const closePopup = () => {
    setPopup({ ...popup, open: false });
  };
  return (
    <section
      className="relative w-full bg-cover md:bg-left-bottom bg-left-top py-16 md:mt-20 mt-12"
      style={{ backgroundImage: "url('/images/bg-donate.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black md:bg-opacity-40 bg-opacity-10 z-0"></div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
          className="text-white z-10"
        >
          <h2 className="text-2xl font-extrabold mb-4">
            Our Company is An End-to-End Mid stream At
          </h2>
          <p className="mb-6 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing varius diam ac
            ipsuelit ut Nulla convallis neque
          </p>
          <Button
            asChild
            variant="outline"
            className="text-base mt-3 px-6 py-2 border-[1px] border-white font-semibold rounded-sm hover:bg-white hover:text-gray-600 transition"
          >
            <Link
              href={`${domainUrl}/lien-he`}
              className="flex items-center justify-center"
            >
              Liên Hệ HEPF
            </Link>
          </Button>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white md:p-10 p-5 rounded-md shadow-md z-10"
        >
          <h3 className="text-2xl font-extrabold text-gray-700 mb-2">
            Đăng ký tư vấn
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vestibulum us in cursus rutrum. Ut vitae sagittis felis.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Họ và tên..."
                  className="border p-2 text-sm rounded-md outline-none w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Số điện thoại"
                  className="border p-2 text-sm rounded-md outline-none w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Địa chỉ email..."
                  className="border p-2 text-sm rounded-md outline-none w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <textarea
                rows={5}
                {...register("message")}
                placeholder="Nội dung..."
                className="border p-2 text-sm rounded-md outline-none w-full"
              />
              {errors.message && (
                <p className="text-red-500 text-sm !mt-0">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="text-sm bg-primary_layout hover:bg-lime-600 text-white px-6 py-2 rounded-sm font-medium focus-visible:none"
            >
              Gửi yêu cầu
            </button>
          </form>
          {/* Popup */}
          {popup.open && (
            <div
              onClick={closePopup}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-md p-6 max-w-md w-full text-center shadow-lg m-4"
              >
                <h3
                  className={`text-lg font-bold ${
                    popup.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {popup.success ? "Thành công" : "Thất bại"}
                </h3>
                <p className="mt-2 text-gray-700">{popup.message}</p>
                <button
                  onClick={closePopup}
                  className="mt-4 px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
