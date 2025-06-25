import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Fetch Inventory Stock Report Api
export const fetchFrRawInvStockReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/raw-inventory-stock-report.php?FrId=${frId}`);
};

//  Fetch Account Product Stock Report Api
export const fetchAccountProductStockReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/stock-report-new.php?FrId=${frId}`);
};

// Raw Product Stock Report
export const fetctRawProductStockReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/fr-raw-product-stock-report.php?FrId=${frId}`);
};

// Category Wise Sell Report
export const fetchCategoryWiseSellReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/sell-by-category-report.php?FrId=${frId}`);
};

// Product Wise Sell Report
export const fetchProductWiseSellReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/sell-by-product-report.php?FrId=${frId}`);
};

// Product Wise Sell Report Date Wise
export const fetchPrWisSellReportDateWisApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/sell-by-product-report-2.php?FrId=${frId}&FromDate=2025-06-01&ToDate=2025-06-01`);
};

// Discount Invoice Report
export const fetchDiscountInvoiceReportApi = async (frId : number): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/reports/discount-report.php?FrId=${frId}`);
};



