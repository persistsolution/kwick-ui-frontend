import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface Category {
  id: number;
  name: string;
  catid: number;
  photo: string; // Optional
}

// Fetch all raw categories
export const fetchRawCategories = async (): Promise<
  AxiosResponse<Category[]>
> => {
  return axios.get<Category[]>(`${API_BASE_URL}/raw-product/category/get`);
};

// API to fetch a raw category by ID
export const fetchByIdRawCategory = async (
  id: number
): Promise<AxiosResponse<Category>> => {
  return axios.get<Category>(`${API_BASE_URL}/raw-product/category/edit/${id}`);
};

// API to update a raw category
export const updateRawCategory = async (
  id: number,
  data: Partial<Category>
): Promise<AxiosResponse<Category>> => {
  return axios.put<Category>(
    `${API_BASE_URL}/raw-product/category/update/${id}`,
    data
  );
};

// API to delete a raw category
export const deleteRawCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/raw-product/category/delete/${id}`
  );
};

// API to create a raw category
export const createRawCategory = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/raw-product/category/create`, data);
};
