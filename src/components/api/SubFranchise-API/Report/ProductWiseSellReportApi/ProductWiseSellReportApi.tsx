import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

//  Fetch Product Wise Sell Report Api
export const fetchProductWiseSellReportApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/kk`);
};
