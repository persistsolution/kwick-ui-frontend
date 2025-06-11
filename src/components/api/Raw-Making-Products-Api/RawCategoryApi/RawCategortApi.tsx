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
  return axios.get<Category[]>(
    `${API_BASE_URL}/raw-products/category/fetch-category-api.php`
  );
};

// API to fetch a raw category by ID
export const fetchByIdRawCategory = async (
  id: number
): Promise<AxiosResponse<Category>> => {
  return axios.get<Category>(
    `${API_BASE_URL}/raw-products/category/get-category-details-api.php?id=${id}`
  );
};

// API to update a raw category
export const updateRawCategory = async (
  id: number,
  data: Partial<Category>
): Promise<AxiosResponse<Category>> => {
  return axios.put<Category>(
    `${API_BASE_URL}/raw-products/category/update-category-api.php?id=${id}`,
    data
  );
};

// API to delete a raw category
export const deleteRawCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/raw-products/category/delete-category-api.php?id=${id}`
  );
};

// API to create a raw category
export const createRawCategory = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/raw-products/category/save-category-api.php`,
    data
  );
};
