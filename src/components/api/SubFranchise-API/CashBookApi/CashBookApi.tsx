import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";
import { useSelector } from "react-redux";

// Add Cash Book Api
export const AddCashBookApi = async (
  data: any
): Promise<AxiosResponse<void>> => {
  return axios.post<void>(`${API_BASE_URL}/retailer/create`, data);
};

// Fetch Cash Book Api
export const fetchCashBookApi = async (frId: string | number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(
    `${API_BASE_URL}/fr_acc/cashbook/view-cash-book.php?FrId=${frId}`
  );
};
