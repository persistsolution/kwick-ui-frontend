import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../config";

// Fetch Commision Note Patner Product Stock Report
export const fetchCommisionNoteApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/CommisionNoteReport/get`);
};

// Fetch Commision Note Patner
export const fetchRawCommisionNoteApi = async (): Promise<
  AxiosResponse<any[]>
> => {
  return axios.get<any[]>(`${API_BASE_URL}/CommisionNoteReport/get/5`);
};

//  Add Commision Note Patner
export const createCommisionNoteApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(
    `${API_BASE_URL}/AddCommisionNoteReport/create`,
    data
  );
};
