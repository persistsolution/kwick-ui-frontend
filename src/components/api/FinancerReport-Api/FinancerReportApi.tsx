import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch Financer Product Stock Report
export const fetchFinancerStockReport = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/financerReport/get/5`);
};

// Fetch Financer Raw Product Stock Report
export const fetchRawFinancerstockReport = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/raw-financerReport/get/5`);
};
