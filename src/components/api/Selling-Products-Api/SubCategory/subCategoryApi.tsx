import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface SubCategory {
  id: number;
  name: string;
  catid: number;
  photo: string; // Optional
}

// API to Fetch all subcategories
export const fetchSubCategories = async (): Promise<
  AxiosResponse<SubCategory[]>
> => {
  return axios.get<SubCategory[]>(
    `${API_BASE_URL}selling-products/subcategory/get-all-sub-categories.php`
  );
};

// API to Create a subcategory
export const createSubCategory = async (
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.post<SubCategory>(
    `${API_BASE_URL}selling-products/subcategory/add-sub-category.php`,
    data
  );
};

// API to Delete a subcategory by ID
export const deleteSubCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `${API_BASE_URL}selling-products/subcategory/delete-sub-category.php?id=${id}`
  );
};

// API to Update a subcategory by ID
export const updateSubCategory = async (
  id: number,
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.put<SubCategory>(
    `${API_BASE_URL}selling-products/subcategory/update-sub-category.php`,
    data
  );
};

// API to Get subcategory by ID
export const fetchSubCategoryById = async (
  id: number
): Promise<AxiosResponse<SubCategory>> => {
  return axios.get<SubCategory>(
    `${API_BASE_URL}selling-products/subcategory/get-sub-category.php?id=${id}`
  );
};
