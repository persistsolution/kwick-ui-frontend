import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

// Fetch all FrEmployee
export const fetchFrEmployee = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`http://localhost:9000/FrEmployeee/get/63`);
};

// API to fetch a FrEmployee by ID
export const fetchByIdFrEmployee = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`http://localhost:9000/FrEmployeee/edit/${id}`);
};

// API to update a FrEmployee
export const updateFrEmployee = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`http://localhost:9000/FrEmployeee/update/${id}`, data);
};

// API to delete a FrEmployee
export const deleteFrEmployee = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`http://localhost:9000/FrEmployeee/delete/${id}`);
};
