import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

//  Fetch Product Api
export const fetchRawProductApi = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/bihiuu`);
};
