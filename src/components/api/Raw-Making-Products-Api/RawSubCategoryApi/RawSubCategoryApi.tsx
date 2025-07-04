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
    `${API_BASE_URL}/raw-products/subcategory/get-all-sub-categories.php`
  );
};

// API to Create a raw subcategory
export const createRawSubCategory = async (
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.post<SubCategory>(
    `${API_BASE_URL}/raw-products/subcategory/save-sub-category.php`,
    data
  );
};

// API to Delete a raw subcategory by ID
export const deleteRawSubCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}/raw-products/subcategory/delete-sub-category.php?id=${id}`
  );
};

// API to Update a raw subcategory by ID
export const updateRawSubCategory = async (
  id: number,
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.put<SubCategory>(
    `${API_BASE_URL}/raw-products/category/update-category-api.php?id=${id}`,
    data
  );
};

// API to Get subcategory by ID
export const fetchRawSubCategoryById = async (
  id: number
): Promise<AxiosResponse<SubCategory>> => {
  return axios.get<SubCategory>(
    `${API_BASE_URL}/raw-products/subcategory/get-sub-category.php?id=${id}`
  );
};
