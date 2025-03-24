import axios, { AxiosResponse } from "axios";
// import { API_BASE_URL } from "../../../config";

// Fetch Start AttendanceApi
export const fetchStartAttendance = async (userId): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`https://kwickfoods.in/iosempapp/api/start-attendance-api.php?userid=${userId}`);
};


// Fetch End AttendanceApi
  export const fetchEndAttendance = async (
    data: any
  ): Promise<AxiosResponse<void>> => {
    return axios.post<void>(`https://kwickfoods.in/iosempapp/api/save-end-attendance-api.php`, data);
  };

// Fetch All AttendancesApi
export const fetchAllAttendance = async (userId): Promise<AxiosResponse<any[]>> => {
    return axios.get<any[]>(`https://kwickfoods.in/iosempapp/api/my-attendance.php?userid=${userId}`);
  };


  // Submit AttendancesApi
export const submitDayAttendanceApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`https://kwickfoods.in/iosempapp/api/save-attendance-api.php`, data);
};


