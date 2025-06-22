import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Inventory Stock Report
export const fetchInventoryStockReportApi = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/raw-inventory-stock-report.php?FrId=${frId}`);
};
// MRP Inventory Stock Report  
export const fetchInventoryMRPStockReportApi = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/mrp-inventory-stock-report.php?FrId=${frId}`);
};

// Asset Inventory Stock Report  
export const fetchInventoryAssetsStockReportApi = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/assets-inventory-stock-report.php?FrId=${frId}`);
};

// Min Inventory Stock Report  
export const fetchInventoryMinMRPStockReportApi = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/min-inventory-stock-report.php?FrId=${frId}`);
};

// Inventory Top Selling Report  
export const fetchInventoryTopSellingPrdApi = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/top-selling-product-report.php?FrId=${frId}`);
};

// Min Inventory Stock Report  
export const fetchInventoryStockLevelReport = async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/inventory_report/stock-level-report.php?FrId=${frId}`);
};
