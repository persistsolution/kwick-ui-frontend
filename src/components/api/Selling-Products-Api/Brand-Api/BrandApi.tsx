import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../../config";

export interface Brand {
  id: number;
  name: string;
  data: Record<string, any>;
}

// Fetch all brands
export const fetchBrandApi = async (): Promise<AxiosResponse<Brand[]>> => {
  return axios.get<Brand[]>(
    `http://192.168.1.6:3000/selling-product/brand/get`
  );
};

// API to fetch a brand by ID
export const fetchByIdBrandApi = async (
  id: number
): Promise<AxiosResponse<Brand>> => {
  return axios.get<Brand>(
    `http://192.168.1.6:3000/selling-product/brand/edit/${id}`
  );
};

// API to update a brand
export const updateBrandApi = async (
  id: number,
  data: Partial<Brand>
): Promise<AxiosResponse<Brand>> => {
  return axios.put<Brand>(
    `http://192.168.1.6:3000/selling-product/brand/update/${id}`,
    data
  );
};

// API to delete a brand
export const deleteBrandApi = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(
    `http://192.168.1.6:3000/selling-product/brand/delete/${id}`
  );
};

// API to create a brand
export const createBrandApi = async (
  data: Brand
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `http://192.168.1.6:3000/selling-product/brand/create`,
    data
  );
};
