import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../../../config";

// Fetch customer Products Api
export const fetchCustomerProductsApi= async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-customer-products.php?FrId=${frId}`);
};

// Fetch Other Products Api
export const fetchOtherProductsApi= async (frId : number): Promise<AxiosResponse<any[]>> => {
  return axios.get<any[]>(`${API_BASE_URL}/fr_acc/cust_products/view-other-products.php?FrId=${frId}`);
};



