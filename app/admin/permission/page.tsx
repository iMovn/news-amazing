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

// Define the Permission type
interface Permission {
    name: string;
    apiPath: string;
    method: string;
    role: string;
    status: string;
    createdAt: string;
    createdBy: string;
}

const initialPermissions: Permission[] = [
    {
        name: "Create User",
        apiPath: "/api/users/create",
        method: "POST",
        role: "Admin",
        status: "Active",
        createdAt: "2025-01-01",
        createdBy: "System",
    },
    {
        name: "Delete User",
        apiPath: "/api/users/delete",
        method: "DELETE",
        role: "Admin",
        status: "Inactive",
        createdAt: "2025-01-02",
        createdBy: "System",
    },
];

export default function Page() {
    const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

    const filteredPermissions = permissions.filter((permission) =>
        permission.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedPermissions = filteredPermissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

    const handleEdit = (permission: Permission) => {
        setEditingPermission(permission);
        setIsDialogOpen(true);
    };

    const handleDelete = (name: string) => {
        setPermissions(permissions.filter((permission) => permission.name !== name));
    };

    const handleAddOrUpdate = (newPermission: Permission) => {
        if (editingPermission) {
            setPermissions(
                permissions.map((perm) =>
                    perm.name === editingPermission.name ? newPermission : perm
                )
            );
        } else {
            setPermissions([...permissions, newPermission]);
        }
        setIsDialogOpen(false);
        setEditingPermission(null);
    };

    return (
        <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search permissions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPermission(null)}>Add New</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle>{editingPermission ? "Edit Permission" : "Add Permission"}</DialogTitle>
                            <DialogDescription>Fill in the details for the permission.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;

                                const formData = new FormData(form);
                                const newPermission: Permission = {
                                    name: formData.get("name") as string,
                                    apiPath: formData.get("apiPath") as string,
                                    method: formData.get("method") as string,
                                    role: formData.get("role") as string,
                                    status: formData.get("status") as string,
                                    createdAt: new Date().toISOString().split("T")[0],
                                    createdBy: "Admin", // Replace with dynamic user if applicable
                                };
                                handleAddOrUpdate(newPermission);
                            }}
                        >
                            <div className="space-y-4">
                                <Input
                                    name="name"
                                    placeholder="Permission Name"
                                    defaultValue={editingPermission?.name || ""}
                                    required
                                />
                                <Input
                                    name="apiPath"
                                    placeholder="API Path"
                                    defaultValue={editingPermission?.apiPath || ""}
                                    required
                                />
                                <Input
                                    name="method"
                                    placeholder="Method"
                                    defaultValue={editingPermission?.method || ""}
                                    required
                                />
                                <Input
                                    name="role"
                                    placeholder="Role"
                                    defaultValue={editingPermission?.role || ""}
                                    required
                                />
                                <Input
                                    name="status"
                                    placeholder="Status"
                                    defaultValue={editingPermission?.status || ""}
                                    required
                                />
                                <Button type="submit">
                                    {editingPermission ? "Update" : "Add"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <Table>
                {filteredPermissions.length > 0 ? (
                    <>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>API Path</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedPermissions.map((permission) => (
                                <TableRow key={permission.name}>
                                    <TableCell>{permission.name}</TableCell>
                                    <TableCell>{permission.apiPath}</TableCell>
                                    <TableCell>{permission.method}</TableCell>
                                    <TableCell>{permission.role}</TableCell>
                                    <TableCell>{permission.status}</TableCell>
                                    <TableCell>{permission.createdAt}</TableCell>
                                    <TableCell>{permission.createdBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(permission)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(permission.name)}
                                            className="ml-2"
                                        >
                                            Delete
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
