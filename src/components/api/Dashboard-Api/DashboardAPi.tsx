import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all Dashboard Data
export const fetchDashboardDataApi = async (fromDate: string , toDate: string  ,selectReport : string ): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/dashboard/dashboard.php?FromDate=${fromDate}&ToDate=${toDate}&calendar=${selectReport}`);
};
