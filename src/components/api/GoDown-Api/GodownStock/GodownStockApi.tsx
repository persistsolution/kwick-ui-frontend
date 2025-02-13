import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Add Godown Stock API
export const addGodownStockApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/godownstock/create`, data);
};

// Fetch All Godown Stock
export const fetchGodownStockApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/godownaccountstock/get`);
};

// API to Delete Godown Stock
export const deleteGodownStock = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/godownstock/delete/${id}`);
};
