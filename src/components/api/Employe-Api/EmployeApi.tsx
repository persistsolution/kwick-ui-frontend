import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all Employe
export const fetchEmploye = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/employee/get/63`);
};

// API to fetch a Employe by ID
export const fetchByIdEmploye = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/employee/edit/${id}`);
};

// API to update a Employe
export const updateEmploye = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/employee/update/${id}`, data);
};

// API to delete a Employe
export const deleteEmploye = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/employee/delete/${id}`);
};

// API to create Employe
export const createEmployeCreate = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/employee/create`, data);
};
