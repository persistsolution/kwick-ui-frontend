import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface Allocated {
  data: [];
}

// Fetch all Allocate Products
export const fetchAllocatedProductsApi = async (id : number): Promise<AxiosResponse<Allocated>> => {
  return axios.get<Allocated>(
    `${API_BASE_URL}/selling-products/allocate-products/view-allocate-products.php`
  );
};

//  Update Allocate Products
export const updateAllocatedProductsApi = async (
  frId : number,
  data: object
): Promise<AxiosResponse<Allocated>> => {
  return axios.post<Allocated>(
    `${API_BASE_URL}/raw-products/other-products/allocate-selling-product.php?frid=${frId}`,
    data
  );
};

// Franchise Fetch all Allocate Products
export const fetchAllocatedProductsFrApi = async (frId : number): Promise<AxiosResponse<Allocated>> => {
  return axios.get<Allocated>(
    `${API_BASE_URL}/selling-products/allocate-products/allocate-selling-product.php?frid=${frId}`
  );
};
