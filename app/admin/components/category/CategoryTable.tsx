"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { CategoryFilters } from "./CategoryFilters";
import { useCategoryTable } from "../../hooks/category/useCategoryTable";
import { useMemo, useState } from "react";
import { Category } from "../../types/category";
import {
  deleteCategory,
  updateCategoryStatus,
} from "../../services/categoryService";
import { AlertCircle } from "lucide-react";

export const CategoryTable = () => {
  const {
    categories,
    loading,
    error,
    setError,
    statusFilter,
    setStatusFilter,
    createdAtFilter,
    setCreatedAtFilter,
    setSelectedCategory,
    isDeleting,
    handleDelete,
    setCategories,
  } = useCategoryTable();

  const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isActivateAlertOpen, setIsActivateAlertOpen] = useState(false);
  const [isDeactivateAlertOpen, setIsDeactivateAlertOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  // Xóa nhiều danh mục
  const handleDeleteSelected = async () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    if (!selectedIds.length) return;

    setIsDeletingSelected(true);
    try {
      const deletePromises = selectedIds.map((id) => deleteCategory(id));
      await Promise.all(deletePromises);

      // Cập nhật lại danh sách danh mục sau khi xóa
      setCategories((prev) =>
        prev.filter((cat) => !selectedIds.includes(cat.id))
      );
    } catch {
      setError("Xóa danh mục thất bại");
    } finally {
      setIsDeletingSelected(false);
      setIsDeleteAlertOpen(false); // Đóng popup sau khi hoàn thành
      table.resetRowSelection(); // Bỏ chọn tất cả các hàng
    }
  };

  // Cập nhật trạng thái nhiều danh mục
  const handleUpdateStatusSelected = async (isActive: number) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    if (!selectedIds.length) return;

    setIsUpdatingStatus(true);
    try {
      const updatePromises = selectedIds.map((id) =>
        updateCategoryStatus(id, isActive)
      );
      await Promise.all(updatePromises);

      // Cập nhật lại danh sách danh mục sau khi thay đổi trạng thái
      setCategories((prev) =>
        prev.map((cat) =>
          selectedIds.includes(cat.id) ? { ...cat, is_active: isActive } : cat
        )
      );
    } catch {
      setError("Cập nhật trạng thái thất bại");
    } finally {
      setIsUpdatingStatus(false);
      // Đóng popup tương ứng
      if (isActive === 1) setIsActivateAlertOpen(false);
      if (isActive === 0) setIsDeactivateAlertOpen(false);
      table.resetRowSelection(); // Bỏ chọn tất cả các hàng
    }
  };

  // Định nghĩa cột của bảng
  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllRowsSelected() || table.getIsSomeRowsSelected()
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Chọn tất cả"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Chọn danh mục"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Tên danh mục",
        cell: ({ row }) => {
          const level = row.original.level || 0;
          return (
            <div className="flex items-center">
              {"|-- ".repeat(level)}
              {row.original.name}
            </div>
          );
        },
      },
      { accessorKey: "slug", header: "Đường Dẫn" },
      {
        accessorKey: "description",
        header: "Mô tả",
        cell: ({ row }) => row.original.description || "N/A",
      },
      {
        accessorKey: "is_active",
        header: "Trạng thái",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-white ${
              row.original.is_active ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {row.original.is_active ? "Hoạt động" : "Không hoạt động"}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Ngày tạo",
        cell: ({ row }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Sửa
            </Button>
            <AlertDialog
              open={isAlertDialogOpen}
              onOpenChange={setIsAlertDialogOpen}
            >
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setSelectedCategory(row.original); // Lưu danh mục được chọn
                  setIsAlertDialogOpen(true); // Mở AlertDialog
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Danh mục sẽ bị xóa vĩnh
                    viễn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(); // Xử lý xóa
                      setIsAlertDialogOpen(false); // Đóng AlertDialog sau khi xóa
                    }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Đang xử lý..." : "Xác nhận"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    [isAlertDialogOpen, isDeleting, setSelectedCategory, handleDelete]
  );

  // Sử dụng useReactTable với phân trang
  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex">
      {/* Bộ lọc bên trái */}
      <CategoryFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        createdAtFilter={createdAtFilter}
        setCreatedAtFilter={setCreatedAtFilter}
        onSearch={(value) => table.getColumn("name")?.setFilterValue(value)}
      />

      {/* Nội dung chính bên phải */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Danh sách danh mục</h2>
        {/* Hiển thị lỗi */}
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {/* Các nút hành động */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">danh mục</span>
          </div>
          <div className="flex items-center gap-2">
            {/* AlertDialog cho Xóa đã chọn */}
            <AlertDialog
              open={isDeleteAlertOpen}
              onOpenChange={setIsDeleteAlertOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteAlertOpen(true)}
                  disabled={
                    !table.getSelectedRowModel().rows.length ||
                    isDeletingSelected
                  }
                >
                  {isDeletingSelected ? "Đang xóa..." : "Xóa đã chọn"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này sẽ xóa vĩnh viễn các danh mục đã chọn và không
                    thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteSelected}
                    disabled={isDeletingSelected}
                  >
                    {isDeletingSelected ? "Đang xóa..." : "Xác nhận"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* AlertDialog cho Kích hoạt */}
            <AlertDialog
              open={isActivateAlertOpen}
              onOpenChange={setIsActivateAlertOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsActivateAlertOpen(true)}
                  disabled={
                    !table.getSelectedRowModel().rows.length || isUpdatingStatus
                  }
                >
                  {isUpdatingStatus ? "Đang cập nhật..." : "Kích hoạt"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này sẽ kích hoạt các danh mục đã chọn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleUpdateStatusSelected(1)}
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? "Đang cập nhật..." : "Xác nhận"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* AlertDialog cho Vô hiệu hóa */}
            <AlertDialog
              open={isDeactivateAlertOpen}
              onOpenChange={setIsDeactivateAlertOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setIsDeactivateAlertOpen(true)}
                  disabled={
                    !table.getSelectedRowModel().rows.length || isUpdatingStatus
                  }
                >
                  {isUpdatingStatus ? "Đang cập nhật..." : "Vô hiệu hóa"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này sẽ vô hiệu hóa các danh mục đã chọn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleUpdateStatusSelected(0)}
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? "Đang cập nhật..." : "Xác nhận"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button asChild variant={"i_btn"}>
              <Link href="/admin/category/add">Thêm mới</Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-md" />
        ) : (
          <>
            {/* Bảng danh mục */}
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Phân trang và tổng số danh mục */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Hiển thị {table.getRowModel().rows.length} trên tổng số{" "}
                {categories.length} danh mục
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Trang {table.getState().pagination.pageIndex + 1} trên{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Trang trước
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Trang sau
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
