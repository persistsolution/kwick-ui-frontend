import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

// Fetch Godown Stock API
export const fetchGodownStockProduct = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/stock/getstockprod`);
};

//  Fetch Product Details
export const fetchProductDetailsApi = async (
  PrId: number,
  GdId: number
): Promise<AxiosResponse<void>> => {
  return axios.get<void>(
    `${API_BASE_URL}/godown/stock/getstockproddetails/${PrId}/${GdId}`
  );
};

//  Add Godown Stock API
export const addGodownStockApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/godownstock/create`, data);
};

// Fetch Godown List
export const fetchGodownListApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/account/get/93
`);
};

// Fetch All Godown Stock
export const fetchGodownStockApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/stock/get`);
};

// API to Delete Godown Stock
export const deleteGodownStock = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/godownstock/delete/${id}`);
};
