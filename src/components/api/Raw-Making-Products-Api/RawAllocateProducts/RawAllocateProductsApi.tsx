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
    `${API_BASE_URL}/selling-product/allocateProducts/get`
  );
};
