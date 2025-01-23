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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";

// Định nghĩa kiểu Setting
interface Setting {
    name: string;
    key: string;
    type: string;
    createdAt: string;
    createdBy: string;
}

const initialSettings: Setting[] = [
    {
        name: "Website Title",
        key: "website_title",
        type: "string",
        createdAt: "2025-01-01",
        createdBy: "Admin",
    },
    {
        name: "Email Support",
        key: "email_support",
        type: "email",
        createdAt: "2025-01-05",
        createdBy: "System",
    },
];

export default function SettingManagement() {
    const [settings, setSettings] = useState<Setting[]>(initialSettings);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSetting, setEditingSetting] = useState<Setting | null>(null);

    const filteredSettings = settings.filter((setting) =>
        setting.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedSettings = filteredSettings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredSettings.length / itemsPerPage);

    const handleEdit = (setting: Setting) => {
        setEditingSetting(setting);
        setIsDialogOpen(true);
    };

    const handleDelete = (key: string) => {
        setSettings(settings.filter((setting) => setting.key !== key));
    };

    const handleAddOrUpdate = (newSetting: Setting) => {
        if (editingSetting) {
            setSettings(
                settings.map((s) =>
                    s.key === editingSetting.key ? newSetting : s
                )
            );
        } else {
            setSettings([...settings, newSetting]);
        }
        setIsDialogOpen(false);
        setEditingSetting(null);
    };

    return (
        <div className="space-y-6">
            {/* Tìm kiếm và thêm mới */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Tìm kiếm cài đặt..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingSetting(null)}>Thêm mới</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle>{editingSetting ? "Sửa cài đặt" : "Thêm cài đặt"}</DialogTitle>
                            <DialogDescription>Điền thông tin cài đặt.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const formData = new FormData(form);
                                const newSetting = {
                                    name: formData.get("name") as string,
                                    key: formData.get("key") as string,
                                    type: formData.get("type") as string,
                                    createdAt: new Date().toISOString().split("T")[0],
                                    createdBy: "Current Admin", // Thay bằng logic người tạo thực tế
                                };
                                handleAddOrUpdate(newSetting);
                            }}
                        >
                            <div className="space-y-4">
                                <Input
                                    name="name"
                                    placeholder="Tên cài đặt"
                                    defaultValue={editingSetting?.name || ""}
                                    required
                                />
                                <Input
                                    name="key"
                                    placeholder="Key"
                                    defaultValue={editingSetting?.key || ""}
                                    required
                                />
                                <Select
                                    name="type"
                                    defaultValue={editingSetting?.type || "string"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="string">String</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button type="submit">
                                    {editingSetting ? "Cập nhật" : "Thêm mới"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Bảng cài đặt */}
            <Table>
                {filteredSettings.length > 0 ? (
                    <>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên cài đặt</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Loại</TableHead>
                                <TableHead>Ngày tạo</TableHead>
                                <TableHead>Người tạo</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedSettings.map((setting) => (
                                <TableRow key={setting.key}>
                                    <TableCell>{setting.name}</TableCell>
                                    <TableCell>{setting.key}</TableCell>
                                    <TableCell>{setting.type}</TableCell>
                                    <TableCell>{setting.createdAt}</TableCell>
                                    <TableCell>{setting.createdBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(setting)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(setting.key)}
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
                                <TableCell colSpan={6}>
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
