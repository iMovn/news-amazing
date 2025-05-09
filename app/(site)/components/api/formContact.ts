import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export const postContact = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/site/contact?domain_id=${DOMAIN_ID}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi gửi liên hệ:", error);
    throw error;
  }
};
