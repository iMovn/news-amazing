"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";

// Định nghĩa kiểu Post
interface Post {
    name: string;
    slug: string;
    avatar: string;
    description: string;
    content: string;
    status: string;
    createdBy: string;
    createdAt: string;
}

const initialPosts: Post[] = [
    {
        name: "Post 1",
        slug: "post-1",
        avatar: "avatar1.jpg",
        description: "Description of post 1",
        content: "Content of post 1",
        status: "Active",
        createdBy: "Admin",
        createdAt: "2025-01-01",
    },
    {
        name: "Post 2",
        slug: "post-2",
        avatar: "avatar2.jpg",
        description: "Description of post 2",
        content: "Content of post 2",
        status: "Inactive",
        createdBy: "Admin",
        createdAt: "2025-01-05",
    },
];

export default function PostManagement() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const filteredPosts = posts.filter((post) =>
        post.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setIsDialogOpen(true);
    };

    const handleDelete = (slug: string) => {
        setPosts(posts.filter((post) => post.slug !== slug));
    };

    const handleAddOrUpdate = (newPost: Post) => {
        if (editingPost) {
            setPosts(
                posts.map((p) =>
                    p.slug === editingPost.slug ? newPost : p
                )
            );
        } else {
            setPosts([...posts, newPost]);
        }
        setIsDialogOpen(false);
        setEditingPost(null);
    };

    return (
        <div className="space-y-6">
            {/* Tìm kiếm và thêm mới */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPost(null)}>Thêm mới</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle>{editingPost ? "Sửa thông tin" : "Thêm bài viết"}</DialogTitle>
                            <DialogDescription>Điền thông tin bài viết.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const formData = new FormData(form);
                                const newPost = {
                                    name: formData.get("name") as string,
                                    slug: formData.get("slug") as string,
                                    avatar: formData.get("avatar") as string,
                                    description: formData.get("description") as string,
                                    content: formData.get("content") as string,
                                    status: formData.get("status") as string,
                                    createdBy: "Current Admin", // Thay bằng logic người tạo thực tế
                                    createdAt: new Date().toISOString().split("T")[0],
                                };
                                handleAddOrUpdate(newPost);
                            }}
                        >
                            <div className="space-y-4">
                                <Input
                                    name="name"
                                    placeholder="Tên bài viết"
                                    defaultValue={editingPost?.name || ""}
                                    required
                                />
                                <Input
                                    name="slug"
                                    placeholder="Slug"
                                    defaultValue={editingPost?.slug || ""}
                                    required
                                />
                                <Input
                                    name="avatar"
                                    placeholder="Avatar"
                                    defaultValue={editingPost?.avatar || ""}
                                    required
                                />
                                <Input
                                    name="description"
                                    placeholder="Mô tả"
                                    defaultValue={editingPost?.description || ""}
                                    required
                                />
                                <Input
                                    name="content"
                                    placeholder="Nội dung"
                                    defaultValue={editingPost?.content || ""}
                                    required
                                />
                                <Input
                                    name="status"
                                    placeholder="Trạng thái"
                                    defaultValue={editingPost?.status || ""}
                                    required
                                />
                                <Button type="submit">
                                    {editingPost ? "Cập nhật" : "Thêm mới"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bảng bài viết */}
            <Table>
                {filteredPosts.length > 0 ? (
                    <>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên bài viết</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Mô tả</TableHead>
                                <TableHead>Nội dung</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Người tạo</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedPosts.map((post) => (
                                <TableRow key={post.slug}>
                                    <TableCell>{post.name}</TableCell>
                                    <TableCell>{post.slug}</TableCell>
                                    <TableCell>{post.avatar}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell>{post.content}</TableCell>
                                    <TableCell>{post.status}</TableCell>
                                    <TableCell>{post.createdBy}</TableCell>
                                    <TableCell>{post.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(post)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(post.slug)}
                                            className="ml-2"
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Pagination
                                        total={totalPages}
                                        currentPage={currentPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </>
                ) : null}
            </Table>
        </div>
    );
}
