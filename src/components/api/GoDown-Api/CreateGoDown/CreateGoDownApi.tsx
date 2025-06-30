import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  create Godown Account API
export const createGodownApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/godown/add-godown.php`, data);
};

// Fetch all Godown Account
export const fetchGodownApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/godown/view-godown.php`);
};

// Fetch Edit Godwon API
export const EditGodownApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/godown/account/create`, data);
};


// API to delete Godown Account
export const deleteGodownAccount = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/godown/account/delete/${id}`);
};
