import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch all SetTarget
export const fetchSetTargetAPI = async (): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/target/view-set-target.php`);
};

// API to fetch a SetTarget by ID
export const fetchByIdSetTarget = async (
  id: number
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(`${API_BASE_URL}/SetTarget/edit/${id}`);
};

// API to update a SetTarget
export const updateSetTarget = async (
  id: number,
  data: Partial<any>
): Promise<AxiosResponse<any>> => {
  return axios.put<any>(`${API_BASE_URL}/SetTarget/update/${id}`, data);
};

// API to delete a SetTarget
export const deleteSetTarget = async (
  id: number
): Promise<AxiosResponse<void>> => {
  return axios.delete<void>(`${API_BASE_URL}/SetTarget/delete/${id}`);
};

// API to create SetTarget
export const createSetTargetAPi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/kwickbill_api/target/set-target.php`, data);
};

// API to create Create Traget Completion
export const TragetCompletionApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/target/target-completion-report.php
`, data);
};

// API to Target Completion Report
export const TargetCompletionReportApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/TargetCompletionReport/create`,
    data
  );
};
