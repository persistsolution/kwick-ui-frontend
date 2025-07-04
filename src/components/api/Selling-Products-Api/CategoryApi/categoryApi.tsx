import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface Category {
  id: number;
  name: string;
}

// Fetch all categories
export const fetchCategories = async (): Promise<AxiosResponse<Category[]>> => {
  return axios.get<Category[]>(
    `${API_BASE_URL}/selling-products/category/fetch-category-api.php`
  );
};

// API to fetch a category by ID
export const fetchByIdCategory = async (
  id: number
): Promise<AxiosResponse<Category>> => {
  return axios.get<Category>(
    `${API_BASE_URL}/selling-products/category/get-category-details-api.php?id=${id}`
  );
};

// API to update a category
export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<AxiosResponse<Category>> => {
  return axios.post<Category>(
    `${API_BASE_URL}/selling-products/category/update-category-api.php?id=${id}`,
    data
  );
};

// API to delete a category
export const deleteCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/selling-products/category/delete-category-api.php?id=${id}`
  );
};

// API to create a category
export const createCategory = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/selling-products/category/save-category-api.php`,
    data
  );
};
