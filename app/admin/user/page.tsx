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

// Định nghĩa kiểu User
interface User {
    fullname: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    status: string;
    createdBy: string;
}

const initialUsers: User[] = [
    {
        fullname: "Nguyen Van A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        role: "Admin",
        createdAt: "2025-01-01",
        status: "Active",
        createdBy: "System",
    },
    {
        fullname: "Tran Thi B",
        email: "tranthib@example.com",
        phone: "0909876543",
        role: "User",
        createdAt: "2025-01-05",
        status: "Inactive",
        createdBy: "Admin",
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsDialogOpen(true);
    };

    const handleDelete = (email: string) => {
        setUsers(users.filter((user) => user.email !== email));
    };

    const handleAddOrUpdate = (newUser: User) => {
        if (editingUser) {
            setUsers(
                users.map((u) =>
                    u.email === editingUser.email ? newUser : u
                )
            );
        } else {
            setUsers([...users, newUser]);
        }
        setIsDialogOpen(false);
        setEditingUser(null);
    };

    return (
        <div className="space-y-6">
            {/* Tìm kiếm và thêm mới */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingUser(null)}>Thêm mới</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle>{editingUser ? "Sửa thông tin" : "Thêm người dùng"}</DialogTitle>
                            <DialogDescription>Điền thông tin người dùng.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const formData = new FormData(form);
                                const newUser = {
                                    fullname: formData.get("fullname") as string,
                                    email: formData.get("email") as string,
                                    phone: formData.get("phone") as string,
                                    role: formData.get("role") as string,
                                    createdAt: new Date().toISOString().split("T")[0],
                                    status: formData.get("status") as string,
                                    createdBy: "Current Admin", // Thay bằng logic người tạo thực tế
                                };
                                handleAddOrUpdate(newUser);
                            }}
                        >
                            <div className="space-y-4">
                                <Input
                                    name="fullname"
                                    placeholder="Họ và tên"
                                    defaultValue={editingUser?.fullname || ""}
                                    required
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={editingUser?.email || ""}
                                    required
                                />
                                <Input
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    defaultValue={editingUser?.phone || ""}
                                    required
                                />
                                <Input
                                    name="role"
                                    placeholder="Vai trò"
                                    defaultValue={editingUser?.role || ""}
                                    required
                                />
                                <Input
                                    name="status"
                                    placeholder="Trạng thái"
                                    defaultValue={editingUser?.status || ""}
                                    required
                                />
                                <Button type="submit">
                                    {editingUser ? "Cập nhật" : "Thêm mới"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bảng người dùng */}
            <Table>
                {filteredUsers.length > 0 ? (
                    <>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Họ và tên</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>Vai trò</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Người tạo</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>{user.createdBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(user.email)}
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
                                <TableCell colSpan={8}>
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
