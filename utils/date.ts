// utils/date.ts

/**
 * Format ngày theo chuẩn dd/mm/yyyy, đảm bảo consistent giữa server và client
 * @param dateString Chuỗi ngày từ API
 * @returns Chuỗi ngày dạng "dd/mm/yyyy"
 */
export function formatDateVi(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh", // Tránh lệ thuộc timezone client
  }).format(date);
}

/**
 * Format ngày theo kiểu "10 Tháng 03, 2025"
 * @param dateString Chuỗi ngày từ API
 * @returns Chuỗi ngày đẹp để hiển thị
 */
export function formatDateLongVi(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}
