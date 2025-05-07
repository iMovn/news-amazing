import axios from "axios";
import { SettingsData } from "../types/setting";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
const API_URL = `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`;

export const fetchSiteSettings = async (): Promise<SettingsData | null> => {
  try {
    const response = await axios.get(API_URL);
    const data: SettingsData = response.data.data;

    return data;
  } catch (error) {
    console.error("Lỗi khi fetch site settings:", error);
    return null;
  }
};
