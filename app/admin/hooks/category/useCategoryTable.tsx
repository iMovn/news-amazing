import { useState, useEffect, useMemo } from "react";
import {
  fetchCategories,
  deleteCategory,
} from "@/app/admin/services/categoryService";
import { Category } from "../../types/category";

export const useCategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  // State cho các bộ lọc
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [createdAtFilter, setCreatedAtFilter] = useState<string>("");

  // Hàm xóa danh mục
  const handleDelete = async () => {
    if (!selectedCategory) return;

    setIsDeleting(true);
    try {
      const success = await deleteCategory(selectedCategory.id);
      if (success) {
        setCategories((prev) =>
          prev.filter((cat) => cat.id !== selectedCategory.id)
        );
      } else {
        setError("Xóa danh mục thất bại");
      }
    } catch (error) {
      setError("Lỗi khi xóa danh mục");
    } finally {
      setIsDeleting(false);
      setSelectedCategory(null);
    }
  };

  // Gọi API lấy danh sách danh mục
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategories();
        if (response.status) {
          setCategories(response.data);
        } else {
          throw new Error(response.message || "Dữ liệu trả về không hợp lệ");
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xây dựng cây danh mục và làm phẳng
  const categoryTree = useMemo(() => {
    const buildCategoryTree = (
      categories: Category[],
      parentId: number | null = null,
      level = 0
    ): Category[] => {
      return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => ({
          ...category,
          level,
          children: buildCategoryTree(categories, category.id, level + 1),
        }));
    };

    const flattenCategoryTree = (tree: Category[]): Category[] => {
      let flatList: Category[] = [];
      tree.forEach((node) => {
        flatList.push(node);
        if (node.children && node.children.length > 0) {
          // Kiểm tra node.children tồn tại
          flatList = flatList.concat(flattenCategoryTree(node.children));
        }
      });
      return flatList;
    };

    const tree = buildCategoryTree(categories);
    return flattenCategoryTree(tree);
  }, [categories]);

  // Lọc danh sách danh mục dựa trên các bộ lọc
  const filteredCategories = useMemo(() => {
    return categoryTree.filter((category) => {
      const matchesStatus =
        !statusFilter || category.is_active === Number(statusFilter);
      const matchesCreatedAt =
        !createdAtFilter ||
        new Date(category.created_at).toLocaleDateString() ===
          new Date(createdAtFilter).toLocaleDateString();

      return matchesStatus && matchesCreatedAt;
    });
  }, [categoryTree, statusFilter, createdAtFilter]);

  return {
    categories: filteredCategories,
    loading,
    error,
    setError,
    statusFilter,
    setStatusFilter,
    createdAtFilter,
    setCreatedAtFilter,
    selectedCategory,
    setSelectedCategory,
    isDeleting,
    handleDelete,
    setCategories,
  };
};
