import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../config";

// Fetch all franchise
export const fetchFranchise = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`http://localhost:3000/franchise/get/5`);
};

// API to fetch a franchise by ID
export const fetchByIdFranchise = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`http://localhost:3000/franchise/edit/${id}`);
};

// API to update a franchise
export const updateFranchise = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`http://localhost:3000/franchise/update/${id}`, data);
};

// API to delete a franchise
export const deleteFranchise = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`http://localhost:3000/franchise/delete/${id}`);
};

// API to create franchise
export const createFranchiseCreate = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`http://localhost:3000/franchise/create`, data);
};
