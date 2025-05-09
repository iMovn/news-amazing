"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postContact } from "../../components/api/formContact";
import { SettingsData } from "../../components/types/setting";
import { fetchSiteSettings } from "../../components/api/settings";
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

export default function Contact() {
  // start get api settings
  const [settings, setSettings] = useState<SettingsData | null>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSiteSettings();
      setSettings(data);
    };
    getData();
  }, []);
  // end get api settings

  // Form handling
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
          {/* Hotline */}
          <div className="flex w-full gap-5">
            <div className="relative mt-2 flex items-center justify-center w-10 h-10">
              <Image
                src="/contact/hotline.jpg"
                alt="icon-contact"
                width={75}
                height={75}
                loading="lazy"
                quality={100}
                className="md:max-w-[50px] md:max-h-[50px] max-w-[60px] max-h-[60px]"
              />
            </div>
            <div>
              <Link href={`tel:${settings?.company.phone}`}>
                <h4 className="font-semibold text-lg mb-1">Hotline</h4>
                <p className="text-sm text-gray-600">
                  {settings?.company.phone || ""}
                </p>
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full gap-5">
            <div className="relative mt-2 flex items-center justify-center w-10 h-10">
              <Image
                src="/contact/hotmail.jpg"
                alt="icon-contact"
                width={75}
                height={75}
                loading="lazy"
                quality={100}
                className="md:max-w-[50px] md:max-h-[50px] max-w-[60px] max-h-[60px]"
              />
            </div>
            <div>
              <Link href={`mailto:${settings?.company.email}`}>
                <h4 className="font-semibold text-lg mb-1">Email</h4>
                <p className="text-sm text-gray-600">
                  {settings?.company.email || ""}
                </p>
              </Link>
            </div>
          </div>

          {/* Local */}
          <div className="flex w-full gap-5">
            <div className="relative mt-2 flex items-center justify-center w-10 h-10">
              <Image
                src="/contact/hotlocal.jpg"
                alt="icon-contact"
                width={75}
                height={75}
                loading="lazy"
                quality={100}
                className="md:max-w-[50px] md:max-h-[50px] max-w-[60px] max-h-[60px]"
              />
            </div>
            <div>
              <Link href="#">
                <h4 className="font-semibold text-lg mb-1">Địa chỉ</h4>
                <p className="text-sm text-gray-600">
                  {settings?.company.address || ""}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-[#F5F5F5] md:p-7 p-5 md:mt-0 mt-7 rounded-md shadow-md z-10">
          <h3 className="text-2xl font-extrabold text-gray-700 mb-2">
            Đăng Ký Tư Vấn
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            vestibulum us in cursus rutrum. Ut vitae sagittis felis.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
            <textarea
              rows={5}
              {...register("message")}
              placeholder="Nội dung..."
              className="border p-2 text-sm rounded-md outline-none w-full"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
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
        </div>
      </div>
    </section>
  );
}
