import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all user Api.
export const fetchUserApi = async (
  mobile: string
): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/employee/login/${mobile}`);
};

// Fetch OTP Api.
export const fetchOTPAPi = async (data: any): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(
    `https://api.pinnacle.in/index.php/sms/send/MHCHAI${data}`
  );
};
