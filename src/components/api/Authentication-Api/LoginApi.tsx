import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../config";

// Fetch all user Api.
export const fetchUserApi = async (number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`https://kwickfoods.in/iosempapp/api/login-api.php?phone=${number}`);
};

// Fetch OTP Api.
export const fetchOTPAPi = async (data): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(
    `https://api.pinnacle.in/index.php/sms/send/MHCHAI${data}`
  );
};
