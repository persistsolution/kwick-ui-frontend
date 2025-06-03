import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

//  Fetch Todays Order Api
export const fetchTodaysBarcodeOrderApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/`);
};
