import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch Daily Sell Report
export const fetchdailySellReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/daily-sale-report.php`);
};

// Fetch Daily Sell Report 2
export const fetchdailySellReport2Api = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/daily-sale-report2.php`);
};

