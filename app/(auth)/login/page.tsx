"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { loginApi } from "@/app/admin/services/authService";
import Image from "next/image";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await loginApi(credentials);
      // console.log("Response Data:", response);
      const { token, user } = response; // Không cần `.data` nữa

      if (!token) throw new Error("Invalid token from server.");

      // Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Điều hướng đến admin
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      // Đặt lỗi cho toàn form
      setError("root", {
        type: "manual",
        message: "Email hoặc mật khẩu không đúng",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative md:w-80 w-96 max-w-md bg-white rounded-3xl shadow-lg">
        <Image
          src={"/admin/card-primary.webp"}
          alt="bg-login-imovn"
          width={900}
          height={900}
          priority
          className="w-full rounded-t-lg"
        />
        <h1 className="absolute -top-5 z-20 text-[72px] font-black text-white">
          log in
        </h1>

        {/* Hiển thị lỗi chung ngay dưới tiêu đề */}
        {errors.root && (
          <p className="text-purple-500 text-center text-sm mb-4">
            {errors.root.message}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-10">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <Input
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ",
                },
              })}
              type="email"
              placeholder="yourmail@gmail.com"
              id="email"
              className={`border ${
                errors.email ? "border-purple-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md px-4 py-2 w-full`}
            />
            {errors.email && (
              <p className="text-purple-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Password không được để trống",
                  minLength: {
                    value: 6,
                    message: "Password phải có ít nhất 6 ký tự",
                  },
                })}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password here login"
                id="password"
                className={`border ${
                  errors.password ? "border-purple-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md px-4 py-2 w-full`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Eye size={17} color="purple" />
                ) : (
                  <EyeOff size={17} color="gray" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-purple-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            variant={"i_btn"}
            type="submit"
            className={`w-full mt-10 flex justify-center items-center text-white font-bold text-base ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Started"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
