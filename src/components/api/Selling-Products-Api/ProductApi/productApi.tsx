import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to Fetch all products
export const fetchProducts = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(
    `${API_BASE_URL}/selling-product/product/get/0`
  );
};

// API to fetch a Product by ID
export const fetchEditProducts = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(
    `${API_BASE_URL}/selling-product/product/edit/${id}`
  );
};

// API to update a product
export const updateProducts = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/selling-product/product/update/${id}`,
    data
  );
};

// API to delete a product
export const deleteProducts = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/selling-product/product/delete/${id}`
  );
};

// API to create a products
export const createProducts = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/selling-product/product/create`,
    data
  );
};
