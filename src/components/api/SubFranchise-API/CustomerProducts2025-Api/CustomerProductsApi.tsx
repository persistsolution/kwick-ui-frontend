import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

// Fetch customer Products Api
export const fetchCustomerProductsApi= async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-customer-products.php?FrId=${frId}`);
};

// Fetch Other Products Api
export const fetchOtherProductsApi= async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-other-products.php?FrId=${frId}`);
};

// Fetch Customer Products Download Excel Api
export const fetchCustomerDownloadExProductsApi= async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/download-customer-product-excel.php?FrId=${frId}`);
};

// Fetch Manage Stock List Api
export const fetchManageStockListApi= async (frId : number  , fromDate : string , toDate: string): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-cust-stocks.php?FrId=${frId}&FromDate=${fromDate}&ToDate=${toDate}`);
};

// Fetch wastage stock list Api
export const fetchWastageStockApi= async (frId : number ,  fromDate : string , toDate: string): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-wastage-stocks.php?FrId=${frId}&FromDate=${fromDate}&ToDate=${toDate}`);
};





