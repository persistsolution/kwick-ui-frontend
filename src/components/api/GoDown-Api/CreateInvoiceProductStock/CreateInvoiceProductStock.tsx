import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  create Godown Invoice Product API
export const createInvoiceProductStockApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/godown/create`, data);
};
