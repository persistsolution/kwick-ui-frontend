import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

export interface AllocateProducts {
  id: number;
  name: string;
}

// Fetch all Raw Allocate Products
export const fetchRawAllocateProductsApi = async (): Promise<
  AxiosResponse<AllocateProducts[]>
> => {
  return axios.get<AllocateProducts[]>(
    `${API_BASE_URL}/raw-products/allocate-products/view-allocate-products.php`
  );
};

//   Allocate Raw Products
export const fetchAllocatedRawProductsApi = async (
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
export const fetchrawallocatedProductsApi = async (frId : number): Promise<
  AxiosResponse<AllocateProducts[]>
> => {
  return axios.get<AllocateProducts[]>(
    `${API_BASE_URL}/raw-products/allocate-products/allocate-selling-product.php?frid=${frId}`
  );
};

// Fetch all Raw Allocated Products
export const updateRawAllocatedProducts = async (data : object): Promise<
  AxiosResponse<AllocateProducts[]>
> => {
  return axios.get<AllocateProducts[]>(
    `${API_BASE_URL}/raw-products/allocate-products/save-allocate-product.php` , data
  );
};



