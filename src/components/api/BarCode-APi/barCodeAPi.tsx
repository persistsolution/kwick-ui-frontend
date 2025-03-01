import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

export const updateBarcodeNoApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}`, data);
};
