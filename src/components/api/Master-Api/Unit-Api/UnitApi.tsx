import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

interface unit {
  id: number;
  name: string;
}

// API to Fetch all Unit
export const fetchUnitApi = async (): Promise<AxiosResponse<unit[]>> => {
  return axios.get<unit[]>(`${API_BASE_URL}/masters/unit/get`);
};
