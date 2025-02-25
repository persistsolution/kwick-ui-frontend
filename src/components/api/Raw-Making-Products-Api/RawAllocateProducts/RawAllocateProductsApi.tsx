import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface AllocateProducts {
  id: number;
  name: string;
}

// Fetch all Raw Allocate Products
export const fetchrawallocateProducts = async (): Promise<
  AxiosResponse<AllocateProducts[]>
> => {
  return axios.get<AllocateProducts[]>(
    `${API_BASE_URL}/selling-product/allocateProducts/get/1`
  );
};

//   Allocate Raw Products
export const allocatedRawProductsApi = async (
  data: object
): Promise<AxiosResponse<AllocateProducts>> => {
  return axios.post<AllocateProducts>(
    `${API_BASE_URL}/raw-product/product/allocaterawprod`,
    data
  );
};

// Fetch all Raw Allocated Products
export const fetchrawallocatedProductsrawidApi = async (
  id: number
): Promise<AxiosResponse<AllocateProducts>> => {
  return axios.get<AllocateProducts>(
    `${API_BASE_URL}/franchise/getallocaterawid/${id}`
  );
};
// Fetch all Raw Allocated Products
export const fetchrawallocatedProductsApi = async (): Promise<
  AxiosResponse<AllocateProducts[]>
> => {
  return axios.get<AllocateProducts[]>(
    `${API_BASE_URL}/raw-product/product/get/1`
  );
};
