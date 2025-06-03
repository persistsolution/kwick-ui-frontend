import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

// Header Print Api Setting
export const headerPrintSettingApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/retailer/create`, data);
};

// Footer Print Api Setting
export const footerPrintSettingApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/retailer/create`, data);
};
