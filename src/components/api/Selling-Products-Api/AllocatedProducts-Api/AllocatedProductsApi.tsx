import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface Allocated {
  data: [];
}

// Fetch all Allocate Products
export const fetchAllocatedProductsApi = async (
  id: number
): Promise<AxiosResponse<Allocated>> => {
  return axios.get<Allocated>(
    `${API_BASE_URL}/selling-product/allocate-product/get/${id}`
  );
};

//  Update Allocate Products
export const updateAllocatedProductsApi = async (
  data: object
): Promise<AxiosResponse<Allocated>> => {
  return axios.post<Allocated>(
    `${API_BASE_URL}/selling-product/allocate-product/update`,
    data
  );
};
