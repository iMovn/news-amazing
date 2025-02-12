export const convertToSlug = (title: string): string => {
    return title
        .toLowerCase()
        .trim()
        .normalize("NFD") // Chuẩn hóa Unicode để tách dấu
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/đ/g, "d") // Chuyển đ -> d
        .replace(/[^a-z0-9 -]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu -
        .replace(/-+/g, "-"); // Thay thế nhiều dấu - liên tiếp thành 1 dấu -
};