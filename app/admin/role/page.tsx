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

// Define the Role type
interface Role {
    name: string;
    status: string;
    createdAt: string;
    createdBy: string;
}

const initialRoles: Role[] = [
    { name: "Admin", status: "Active", createdAt: "2025-01-01", createdBy: "System" },
    { name: "Editor", status: "Inactive", createdAt: "2025-01-10", createdBy: "Admin" },
    { name: "Viewer", status: "Active", createdAt: "2025-01-15", createdBy: "Admin" },
];

export default function RoleManagementPage() {
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const filteredRoles = roles.filter((role) =>
        role.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedRoles = filteredRoles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setIsDialogOpen(true);
    };

    const handleDelete = (roleName: string) => {
        setRoles(roles.filter((role) => role.name !== roleName));
    };

    const handleAddOrUpdate = (newRole: Role) => {
        if (editingRole) {
            setRoles(
                roles.map((role) =>
                    role.name === editingRole.name ? newRole : role
                )
            );
        } else {
            setRoles([...roles, newRole]);
        }
        setIsDialogOpen(false);
        setEditingRole(null);
    };

    return (
        <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3"
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingRole(null)}>Add New</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-md shadow-md">
                        <DialogHeader>
                            <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
                            <DialogDescription>Fill in the details for the role.</DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;

                                const formData = new FormData(form);
                                const newRole = {
                                    name: formData.get("name") as string,
                                    status: formData.get("status") as string,
                                    createdAt: formData.get("createdAt") as string,
                                    createdBy: formData.get("createdBy") as string,
                                };
                                handleAddOrUpdate(newRole);
                            }}
                        >
                            <div className="space-y-4">
                                <Input
                                    name="name"
                                    placeholder="Role Name"
                                    defaultValue={editingRole?.name || ""}
                                    required
                                />
                                <Input
                                    name="status"
                                    placeholder="Status"
                                    defaultValue={editingRole?.status || ""}
                                    required
                                />
                                <Input
                                    name="createdAt"
                                    type="date"
                                    placeholder="Creation Date"
                                    defaultValue={editingRole?.createdAt || ""}
                                    required
                                />
                                <Input
                                    name="createdBy"
                                    placeholder="Created By"
                                    defaultValue={editingRole?.createdBy || ""}
                                    required
                                />
                                <Button type="submit">
                                    {editingRole ? "Update" : "Add"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <Table>
                {filteredRoles.length > 0 ? (
                    <>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedRoles.map((role) => (
                                <TableRow key={role.name}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.status}</TableCell>
                                    <TableCell>{role.createdAt}</TableCell>
                                    <TableCell>{role.createdBy}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(role)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(role.name)}
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
                                <TableCell colSpan={5}>
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