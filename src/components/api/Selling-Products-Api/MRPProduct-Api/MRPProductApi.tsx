import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to Fetch all MRP products
export const fetchMRPProductsApi = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(
    `${API_BASE_URL}/selling-products/mrp-products/get-all-products.php`
  );
};

// API to fetch a MRP Product by ID
export const fetchEditMRPProductsAPI = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(
    `${API_BASE_URL}/selling-products/mrp-products/get-product.php?id=${id}`
  );
};

// API to update a MRP product
export const updateMRPProductsAPI = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/selling-products/mrp-products/update-product.php`,
    data
  );
};

// API to delete a MRP product
export const deleteMRPProductsApi = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/selling-products/mrp-products/delete-product.php?id=${id}`
  );
};

// API to create a MRP products
export const createMRPProductsAPI = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/selling-products/mrp-products/add-product.php`,
    data
  );
};
