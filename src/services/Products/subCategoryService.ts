import axios from 'axios';
import { API_BASE_URL } from "../../config";

export interface SubCategory {
    id: number;
    Name: string;
    // Add any other properties relevant to SubCategory
}

export const fetchSubCategories = async (): Promise<SubCategory[]> => {
    try {
        const response = await axios.get<SubCategory[]>(`${API_BASE_URL}/viewSubCategory`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return [];
    }
};
