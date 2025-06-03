import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../../config";

// API to create FrEmployee
export const addFrEmployeeCreate = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`http://localhost:9000/FrEmployeee/add`, data);
};
