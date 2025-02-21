import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to raw Fetch all products
export const fetchRawProducts = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(`${API_BASE_URL}/raw-product/product/get/1`);
};

// API to raw fetch a Product by ID
export const fetchRawEditProductsApi = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(`${API_BASE_URL}/raw-product/product/edit/${id}`);
};

// API to raw update a product
export const updateRawProductsApi = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/raw-product/product/update/${id}`,
    data
  );
};

// API to raw delete a product
export const deleteRawProducts = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/raw-product/product/delete/${id}`);
};

// API to raw create a products
export const createRawProducts = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/raw-product/product/create`, data);
};
