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

// Fetch Weekly Sell Report
export const fetchWeeklySellReport2Api = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/weekly-sale-report.php`);
};

// Fetch GoDown Product Stock Report
export const fetchGodownProductStockReport = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/godown-product-stock-report.php`);
};

// Fetch GoDown Product Stock Report
export const fetchGodownFranchiseReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/transfer-stock-godown-to-franchise-report.php`);
};

// Fetch GoDown Product Stock Report
export const fetchGodownFranchiseReport2Api = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/reports/transfer-stock-godown-to-franchise-report-2.php`);
};

