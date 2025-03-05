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
import {
  AlertCircle,
  BadgeCheck,
  BadgeX,
  CaptionsOff,
  CircleAlert,
  FolderPen,
  FolderPlus,
  ListChecks,
  ListEnd,
  ListTodo,
  ListX,
  Trash2,
} from "lucide-react";
import Breadcrumbs from "../Breadcrumbs";

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
    users,
  } = useCategoryTable();

  const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isActivateAlertOpen, setIsActivateAlertOpen] = useState(false);
  const [isDeactivateAlertOpen, setIsDeactivateAlertOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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

  // Hàm tìm thông tin người dùng dựa trên user_id
  const getUserInfo = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  // Định nghĩa cột của bảng
  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            color="#fff"
            className="bg-white shadow-md ml-3 rounded-[4px]"
            checked={
              table.getIsAllRowsSelected() || table.getIsSomeRowsSelected()
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Chọn tất cả"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="border-secondary text-white ml-3 rounded-[4px]"
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

      // {
      //   accessorKey: "description",
      //   header: "Mô tả",
      //   cell: ({ row }) => row.original.description || "N/A",
      // },

      {
        accessorKey: "user_id",
        header: "Người tạo",
        cell: ({ row }) => {
          const user = getUserInfo(row.original.user_id);
          return user ? user.name : "Không xác định";
        },
      },
      {
        accessorKey: "user_role",
        header: "Vai trò",
        cell: ({ row }) => {
          const user = getUserInfo(row.original.user_id);
          return user ? user.role : "Không xác định";
        },
      },

      {
        accessorKey: "is_active",
        header: "Trạng thái",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded text-whit ${
              row.original.is_active ? "text-green-500" : "text-red-700"
            }`}
          >
            {row.original.is_active ? (
              <BadgeCheck color="#00848E" />
            ) : (
              <BadgeX color="gray" />
            )}
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
            <Button size="sm" variant="edit_btn">
              <FolderPen /> Sửa
            </Button>

            <Button
              size="sm"
              variant="dele_btb"
              onClick={() => {
                setSelectedCategory(row.original); // Lưu danh mục được chọn
                setIsAlertOpen(true); // Mở AlertDialog ngay lập tức
              }}
              disabled={isDeleting}
            >
              <Trash2 /> {isDeleting ? "Đang xóa..." : "Xóa"}
            </Button>

            <AlertDialog
              open={isAlertOpen} // Sử dụng state để quản lý trạng thái mở/đóng
              onOpenChange={setIsAlertOpen} // Cập nhật state khi trạng thái thay đổi
            >
              <AlertDialogContent className="bg-white shadow-lg border-t-4 border-primary">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-1 uppercase text-primary font-bold">
                    <CircleAlert color="#E56427" />
                    Bạn có chắc chắn?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-700">
                    Hành động này không thể hoàn tác. Danh mục sẽ bị xóa vĩnh
                    viễn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-white bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                    onClick={() => {
                      handleDelete(); // Xử lý xóa
                    }}
                    disabled={isDeleting}
                  >
                    <Trash2 /> {isDeleting ? "Đang xử lý..." : "Xác nhận"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    [
      getUserInfo,
      isAlertOpen,
      setSelectedCategory,
      isDeleting,
      handleDelete,
      users,
    ]
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
    <div className="flex justify-between gap-6">
      {/* Bộ lọc bên trái */}
      <section>
        <CategoryFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          createdAtFilter={createdAtFilter}
          setCreatedAtFilter={setCreatedAtFilter}
          onSearch={(value) => table.getColumn("name")?.setFilterValue(value)}
        />
      </section>

      {/* Nội dung chính bên phải */}
      <section className="flex-1">
        <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4">
          {/* Breadcrumbs */}
          <Breadcrumbs />
          <h2 className="text-xl text-primary font-bold mb-4">
            Danh sách danh mục
          </h2>
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
                    {isDeletingSelected ? "Đang xóa..." : <ListEnd />}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white shadow-lg border-t-4 border-thirdary">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-1 uppercase text-primary font-bold">
                      <CircleAlert color="#E56427" /> Bạn có chắc chắn?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-gray-700">
                      Hành động này sẽ xóa vĩnh viễn các danh mục đã chọn và
                      không thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                      onClick={handleDeleteSelected}
                      disabled={isDeletingSelected}
                    >
                      <Trash2 />{" "}
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
                    variant="destructive"
                    onClick={() => setIsActivateAlertOpen(true)}
                    disabled={
                      !table.getSelectedRowModel().rows.length ||
                      isUpdatingStatus
                    }
                  >
                    {isUpdatingStatus ? "Đang cập nhật..." : <ListTodo />}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white shadow-lg border-t-4 border-secondary">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-1 uppercase text-primary font-bold">
                      <CircleAlert color="#E56427" />
                      Bạn có chắc chắn?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-gray-700">
                      Hành động này sẽ kích hoạt các danh mục đã chọn.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white bg-gradient-to-br from-secondary to-primary rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                      onClick={() => handleUpdateStatusSelected(1)}
                      disabled={isUpdatingStatus}
                    >
                      <ListChecks />
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
                    variant="destructive"
                    onClick={() => setIsDeactivateAlertOpen(true)}
                    disabled={
                      !table.getSelectedRowModel().rows.length ||
                      isUpdatingStatus
                    }
                  >
                    {isUpdatingStatus ? "Đang cập nhật..." : <ListX />}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white shadow-lg border-t-4 border-thirdary">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-1 uppercase text-primary font-bold">
                      <CircleAlert color="#E56427" />
                      Bạn có chắc chắn?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-gray-700">
                      Hành động này sẽ vô hiệu hóa các danh mục đã chọn.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all">
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white bg-gradient-to-br from-gray-400 to-gray-800 rounded-lg shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                      onClick={() => handleUpdateStatusSelected(0)}
                      disabled={isUpdatingStatus}
                    >
                      <CaptionsOff />{" "}
                      {isUpdatingStatus ? "Đang cập nhật..." : "Xác nhận"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button asChild variant="new_btn">
                <Link href="/admin/category/add">
                  <FolderPlus /> Thêm mới
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-md" />
        ) : (
          <>
            {/* Bảng danh mục */}
            <Table className="bg-white shadow-lg shadow-gray-200 rounded-2xl my-6">
              <TableHeader className="text-white bg-gradient-to-br from-primary to-secondary uppercase text-xs">
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
                  <TableRow key={row.id} className="hover:bg-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-0 text-sm text-gray-600"
                      >
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
      </section>
    </div>
  );
};
