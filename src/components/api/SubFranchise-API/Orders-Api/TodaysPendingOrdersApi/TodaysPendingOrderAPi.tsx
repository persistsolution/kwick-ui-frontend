import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

//  Fetch Todays Pending Order Api
export const fetchTodaysPendingOrderApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/`);
};
