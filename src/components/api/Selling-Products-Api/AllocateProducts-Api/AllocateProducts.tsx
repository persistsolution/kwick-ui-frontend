import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface Category {
  id: number;
  name: string;
}

// Fetch all Allocate Products
export const fetchallocateProducts = async (): Promise<
  AxiosResponse<Category[]>
> => {
  return axios.get<Category[]>(
    `${API_BASE_URL}/selling-product/allocateProducts/get`
  );
};
