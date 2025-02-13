import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

//  Return Request GoDown API
export const fetchGodownReturnProductApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/godownaccountstock/get`);
};
