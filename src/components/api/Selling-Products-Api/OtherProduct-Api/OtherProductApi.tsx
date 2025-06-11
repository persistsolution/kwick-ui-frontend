import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to Fetch all Other products
export const fetchOtherProductsApi = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(
    `${API_BASE_URL}/selling-products/other-products/get-all-products.php`
  );
};

// API to fetch a Other Product by ID
export const fetchOtherProductsByIdAPI = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(
    `${API_BASE_URL}/selling-products/other-products/get-product.php?id=${id}`
  );
};

// API to update a Other product
export const updateOtherProductsAPI = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/selling-products/other-products/update-product.php`,
    data
  );
};

// API to delete a Other product
export const deleteOtherProductsApi = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/selling-products/other-products/delete-product.php?id=${id}`
  );
};

// API to create a Other products
export const createOtherProductsAPI = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/selling-products/other-products/add-product.php`,
    data
  );
};
