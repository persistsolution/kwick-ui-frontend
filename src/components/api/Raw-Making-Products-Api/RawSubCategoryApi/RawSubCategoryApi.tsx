import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface SubCategory {
  id: number;
  name: string;
  catid: number;
  photo: string;
}

// API to Fetch all raw subcategories
export const fetchRawSubCategories = async (): Promise<
  AxiosResponse<SubCategory[]>
> => {
  return axios.get<SubCategory[]>(
    `${API_BASE_URL}/raw-product/subcategory/get`
  );
};

// API to Create a raw subcategory
export const createRawSubCategory = async (
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.post<SubCategory>(
    `${API_BASE_URL}/raw-product/subcategory/create`,
    data
  );
};

// API to Delete a raw subcategory by ID
export const deleteRawSubCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/raw-product/subcategory/delete/${id}`
  );
};

// API to Update a raw subcategory by ID
export const updateRawSubCategory = async (
  id: number,
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.put<SubCategory>(
    `${API_BASE_URL}/raw-product/subcategory/update/${id}`,
    data
  );
};

// API to Get subcategory by ID
export const fetchRawSubCategoryById = async (
  id: number
): Promise<AxiosResponse<SubCategory>> => {
  return axios.get<SubCategory>(
    `${API_BASE_URL}/raw-product/subcategory/edit/${id}`
  );
};
