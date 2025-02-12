import axios from 'axios';
import { API_BASE_URL } from "../../config";

export interface Category {
    id: number;
    Name: string;
    // Add any other properties
}

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get<Category[]>(`${API_BASE_URL}/viewCategory`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
