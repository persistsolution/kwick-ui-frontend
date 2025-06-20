import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all franchise Product Stock Report
export const fetchFranchiseStockReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/product-stock-report.php`);
};

// Fetch all franchise raw Product Stock Report
export const fetchFranchiseRawStockReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/fr-raw-product-stock-report.php`);
};

// Fetch all Category Wise Sale Report
export const fetchCategoryWiseSaleReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/sell-by-category-report.php
`);
};

// Fetch all Product Wise Sale Report
export const fetchPrdWiseSaleReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/sell-by-product-report.php
`);
};

// Fetch all MRP Product Wise Sale Report
export const fetchMRPPrdWiseSaleReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/sell-by-mrp-product-report.php
`);
};

// Fetch all Category Wise Sale Report
export const fetchSellReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/category-sale-report.php`);
};

// Fetch all Discount Product Wise Sale Report
export const fetchDiscountReportApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/franchise-report/discount-report.php`);
};

// API to fetch a franchise by ID
export const fetchByIdFranchise = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/franchise/edit/${id}`);
};

// API to update a franchise
export const updateFranchise = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/franchise/update/${id}`, data);
};

// API to delete a franchise
export const deleteFranchise = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/franchise/delete/${id}`);
};

// API to create franchise
export const createFranchiseCreate = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/franchise/create`, data);
};
