import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Product {
  id: number;
  name: string;
}

// API to raw Fetch all products
export const fetchRawProducts = async (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(`${API_BASE_URL}/raw-products/products/get-all-products.php`);
};

// API to raw Fetch all Customer products List
export const fetchRawCustomerProductListApi = async (): Promise<
  AxiosResponse<Product[]>
> => {
  return axios.get<Product[]>(
    `${API_BASE_URL}/raw-product/product/getprodlist`
  );
};

// API to raw fetch a Product by ID
export const fetchRawProductsByIdApi = async (
  id: number
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(`${API_BASE_URL}/raw-products/products/get-product.php?id=${id}`);
};

// API to raw update a product
export const updateRawProductsApi = async (
  id: number,
  data: Partial<Product>
): Promise<AxiosResponse<Product>> => {
  return axios.put<Product>(
    `${API_BASE_URL}/raw-products/products/update-product.php`,
    data
  );
};

// API to raw delete a product
export const deleteRawProducts = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/raw-products/products/delete-product.php?id=${id}`);
};


// API to raw create a products
export const createRawProducts = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/raw-products/products/add-product.php`, data);
};
