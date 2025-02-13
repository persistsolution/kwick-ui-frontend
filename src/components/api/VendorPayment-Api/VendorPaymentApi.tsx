import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all VendorPayments
export const fetchVendorPaymentsApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/VendorPayments/get`);
};

// API to fetch a VendorPayments by ID
export const fetchByIdVendorPaymentsApi = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/VendorPayments/edit/${id}`);
};

// API to update a VendorPayments
export const updateVendorPaymentsApi = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/VendorPayments/update/${id}`, data);
};

// API to delete a VendorPayments
export const deleteVendorPaymentsApi = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/VendorPayments/delete/${id}`);
};

// API to create VendorPayments
export const createVendorPaymentsApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/VendorPayments/create`, data);
};
