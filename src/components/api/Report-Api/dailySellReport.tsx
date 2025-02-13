import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch Daily Sell Report
export const fetchdailySellReport = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/dailySellReport/get`);
};
