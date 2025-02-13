import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch Financer Patner Product Stock Report
export const fetchFinancerPatnerAccountApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/FinancerPatnerReport/get/5`);
};

// Fetch Financer Patner
export const fetchRawFinancerPatnerApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/FinancerPatnerReport/get/5`);
};

//  Add Financer Patner
export const createFinancerPatnerApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/AddFinancerpather/create`, data);
};
