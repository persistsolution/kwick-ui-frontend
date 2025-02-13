import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Add Stock to Fofo API
export const addTransferStockToFofoFrApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/TransferStockToFofoFr/create`, data);
};

// Fetch All Fofo Stock
export const fetchTransferStockToFofoFrApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godownaccountstock/get`);
};

// Delete Fofo Stock API
export const deleteTransferStockToFofoFr = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/TransferStockToFofoFr/delete/${id}`
  );
};
