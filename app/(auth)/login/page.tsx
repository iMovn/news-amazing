"use client";

import React, { useState, useEffect, forwardRef } from "react";
import { Form, Input, Button, message } from "antd";
import { loginApi } from "@/services/ad/authService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

// Import InputRef từ antd
import { InputRef } from "antd/es/input";

interface PasswordInputProps {
  type: string;
  placeholder: string;
  onClick: () => void;
}

const PasswordInput = forwardRef<InputRef, PasswordInputProps>((props, ref) => (
  <Input.Password
    {...props}
    ref={ref} // Ref type sẽ phù hợp với InputRef từ antd
    iconRender={(visible: boolean) =>
      visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
    }
  />
));

PasswordInput.displayName = "PasswordInput"; // Add display name to avoid ESLint warning

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Auto redirect to /admin if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  // Handle form submission for login
  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await loginApi(values); // Call login API
      const { token, user } = response.data;

      localStorage.setItem("token", token); // Save token to localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Save user data to localStorage
      console.log("User information:", user);

      message.success("Login successful!");
      router.push("/admin"); // Redirect to admin page after login
    } catch (error: any) {
      message.error(
        error?.message || "Login failed. Please try again." // Error handling improvement
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login My Admin</h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <PasswordInput
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
          >
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
