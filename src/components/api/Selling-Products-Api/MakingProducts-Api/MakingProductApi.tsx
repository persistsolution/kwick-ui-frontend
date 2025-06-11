import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to Fetch all Making products
export const fetchMakingProductsApi = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(
    `${API_BASE_URL}/selling-products/making-products/get-all-making-products.php`
  );
};

// API to fetch a Making Product by ID
export const fetchEditMakingProductsAPI = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(
    `${API_BASE_URL}/selling-products/making-products/get-making-product.php?id=${id}`
  );
};

// API to update a Making product
export const updateMakingProductsAPI = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/selling-products/making-products/update-making-product.php`,
    data
  );
};

// API to delete a Making product
export const deleteMakingProductsApi = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/selling-products/making-products/delete-making-product.php?id=${id}`
  );
};

// API to create a Making products
export const createMakingProductsAPI = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/selling-products/making-products/add-making-product.php`,
    data
  );
};
