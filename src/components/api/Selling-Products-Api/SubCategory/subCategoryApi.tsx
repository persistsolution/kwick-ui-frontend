import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../../config";

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
    `http://localhost:3000/selling-product/subcategory/get`
  );
};

// API to Create a subcategory
export const createSubCategory = async (
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.post<SubCategory>(
    `http://localhost:3000/selling-product/subcategory/create`,
    data
  );
};

// API to Delete a subcategory by ID
export const deleteSubCategory = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `http://localhost:3000/selling-product/subcategory/delete/${id}`
  );
};

// API to Update a subcategory by ID
export const updateSubCategory = async (
  id: number,
  data: Partial<SubCategory>
): Promise<AxiosResponse<SubCategory>> => {
  return axios.put<SubCategory>(
    `http://localhost:3000/selling-product/subcategory/update/${id}`,
    data
  );
};

// API to Get subcategory by ID
export const fetchSubCategoryById = async (
  id: number
): Promise<AxiosResponse<SubCategory>> => {
  return axios.get<SubCategory>(
    `http://localhost:3000/selling-product/subcategory/edit/${id}`
  );
};
