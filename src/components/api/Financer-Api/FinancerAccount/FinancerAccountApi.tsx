import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

// Fetch all financer
export const fetchFinancer = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/financer/get/105`);
};

// API to fetch a financer by ID
export const fetchByIdFinancer = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/financer/edit/${id}`);
};

// API to update a financer
export const updateFinancer = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/financer/update/${id}`, data);
};

// API to delete a financer
export const deletFinancer = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/financer/delete/${id}`);
};

// API to create financer
export const createFinancer = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/financer/create`, data);
};
