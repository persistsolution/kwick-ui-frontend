import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all retailer
export const fetchretailer = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/retailer/get/95`);
};

// API to fetch a retailer by ID
export const fetchByIdretailer = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/retailer/edit/${id}`);
};

// API to update a retailer
export const updateretailer = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/retailer/update/${id}`, data);
};

// API to delete a retailer
export const deleteretailer = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/retailer/delete/${id}`);
};

// API to create retailer
export const createretailer = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/retailer/create`, data);
};
