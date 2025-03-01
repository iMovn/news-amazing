// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Post } from "../../types/post";
// import { convertToSlug } from "../../utils/slug";
// import { fetchCategories } from "../../services/categoryService";
// import { Category } from "../../types/category";

// export default function PostInsert() {
//     const [post, setPost] = useState<Post>({
//         name: "",
//         slug: "",
//         description: "",
//         content: "",
//         category: null,
//         status: true,
//     });

//     const [categories, setCategories] = useState<Category[]>([]);

//     useEffect(() => {
//         const loadCategories = async () => {
//             const data = await fetchCategories();
//             console.log(data?.data);

//             setCategories(data?.data);
//             if (data.length > 0) {
//                 setPost((prev) => ({ ...prev, category: data[0] }));
//             }
//         };
//         loadCategories();
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setPost((prev) => ({ ...prev, [name]: value }));

//         if (name === "name") {
//             setPost((prev) => ({
//                 ...prev,
//                 slug: convertToSlug(value),
//             }));
//         }
//     };

//     const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedCategory = categories.find((c) => c.id === e.target.value) || null;
//         setPost((prev) => ({ ...prev, category: selectedCategory }));
//     };

//     const handleToggleStatus = () => {
//         setPost((prev) => ({ ...prev, status: !prev.status }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form values:", post);
//         alert("Bài viết đã được thêm thành công!");
//     };

//     return (
//         <div>
//             <h1 className="text-xl font-semibold mb-4">Thêm Bài Viết</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Title Input */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Tên bài viết</label>
//                     <Input
//                         name="name"
//                         value={post.name}
//                         onChange={handleChange}
//                         placeholder="Nhập tên bài viết"
//                         required
//                     />
//                 </div>

//                 {/* Slug Input */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Slug</label>
//                     <Input
//                         name="slug"
//                         value={post.slug}
//                         onChange={handleChange}
//                         placeholder="Nhập slug"
//                         required
//                     />
//                 </div>

//                 {/* Description Textarea */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Mô tả</label>
//                     <textarea
//                         name="description"
//                         value={post.description}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg p-2"
//                         rows={3}
//                         placeholder="Nhập mô tả"
//                     />
//                 </div>

//                 {/* Content Textarea */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Nội dung</label>
//                     <textarea
//                         name="content"
//                         value={post.content}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg p-2"
//                         rows={4}
//                         placeholder="Nhập nội dung"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">Nội dung</label>
//                     <select name="category" className="w-full border rounded-lg p-2" value={post.category?.id || ""} onChange={handleCategoryChange}>
//                         <option value="">Chọn Danh Mục</option>
//                         {categories.map((cat) => (
//                             <option key={cat.id} value={cat.id}>
//                                 {cat.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Status Toggle */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Trạng thái</label>
//                     <label className="flex items-center cursor-pointer">
//                         <input
//                             type="checkbox"
//                             checked={post.status}
//                             onChange={handleToggleStatus}
//                             className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-all">
//                             <div
//                                 className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${post.status ? "translate-x-5" : "left-1"
//                                     }`}
//                             ></div>
//                         </div>
//                         <span className="ml-3 text-sm">{post.status ? "Kích hoạt" : "Tạm ngưng"}</span>
//                     </label>
//                 </div>

//                 {/* Submit Button */}
//                 <Button type="submit" className="w-full">
//                     Thêm mới
//                 </Button>
//             </form>
//         </div>
//     );
// }
"use client";

import React from "react";

export default function Insert() {
  return <div>Hi</div>;
}
