import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../../config";

export interface Category {
  id: number;
  name: string;
}

// Fetch all categories
export const fetchCategories = async (): Promise<AxiosResponse<Category[]>> => {
  return axios.get<Category[]>(
    `http://localhost:3000/selling-product/category/get/0`
  );
};

// API to fetch a category by ID
export const fetchByIdCategory = async (
  id: number
): Promise<AxiosResponse<Category>> => {
  return axios.get<Category>(
    `http://localhost:3000/selling-product/category/edit/${id}`
  );
};

// API to update a category
export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<AxiosResponse<Category>> => {
  return axios.put<Category>(
    `http://localhost:3000/selling-product/category/update/${id}`,
    data
  );
};

// API to delete a category
export const deleteCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `http://localhost:3000/selling-product/category/delete/${id}`
  );
};

// API to create a category
export const createCategory = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `http://localhost:3000/selling-product/category/create`,
    data
  );
};
