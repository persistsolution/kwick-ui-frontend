import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";


interface PrintCompanyInfo {
  company_name: string;
  address: string;
  mobile_number: string;
  gst_number: string;
  terms_condition: string;
  bottom_title: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}


// Fetch Print Setting Api
export const fetchPrintSettingApi = async (
  frId: number,
  payload: any
): Promise<AxiosResponse<ApiResponse<PrintCompanyInfo>>> => {
  return axios.get<ApiResponse<PrintCompanyInfo>>(
    `${API_BASE_URL}/fr_acc/setting/invoice-print-setting.php?FrId=${frId}`, payload
  );
};
