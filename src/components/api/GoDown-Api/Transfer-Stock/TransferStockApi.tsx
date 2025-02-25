import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Add Stock to Coco API
export const addTransferStockToCocoFrApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/TransferStockToCocoFr/create`, data);
};

// Fetch All Coco Stock
export const fetchTransferStockToCocoFrApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/transferstock/get/1`);
};

// Delete Coco Stock API
export const deleteTransferStockToCocoFr = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/TransferStockToCocoFr/delete/${id}`
  );
};

//  Add Stock to Other API
export const addTransferStockToOtherFrApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/TransferStockToOtherFr/create`,
    data
  );
};

// Fetch All Other Stock
export const fetchTransferStockToOtherFrApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/transferstock/get/0`);
};

// Delete Other Stock API
export const deleteTransferStockToOtherFr = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/TransferStockToOtherFr/delete/${id}`
  );
};

// Pending Request GoDown API
export const fetchGodownPendingRequestApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godownaccountstock/get`);
};

// Pending Approve GoDown API
export const fetchGodownApproveRequestApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godownaccountstock/get`);
};
