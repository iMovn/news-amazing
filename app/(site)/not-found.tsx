"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // nếu dùng shadcn/ui
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center space-y-6 max-w-xl">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-primary_layout"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-gray-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Không tìm thấy trang
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Trang bạn đang tìm không tồn tại hoặc đã bị xóa. Hãy quay về trang chủ
          để tiếp tục trải nghiệm nhé!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/" passHref>
            <Button variant="new_btn" size="lg" className="gap-2">
              <ArrowLeft size={18} />
              Quay về trang chủ
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
