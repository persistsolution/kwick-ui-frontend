import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all Employe
export const fetchEmployeApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/employee/view-employee.php`);
};

// API to fetch a Employe by ID
export const fetchByIdEmployeeApi = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/employee/edit/${id}`);
};

// API to update a Employe
export const updateEmployeeApi = async (
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
  return axios.post<void>(`${API_BASE_URL}/kwickbill_api/employee/add-employee.php `, data);
};
