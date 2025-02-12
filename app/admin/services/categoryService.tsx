import { Category } from "../types/category";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(apiUrl + "/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch category");

    return await response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
};
