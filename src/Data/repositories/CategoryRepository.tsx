import { AxiosError } from 'axios';
import { Category } from '../../Domain/entities/Category';
import { CategoryRepository } from '../../Domain/repositories/CategoryRepository';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';

export class CategoryRepositoryImpl implements CategoryRepository {

    async getCategories(): Promise<Category[]> { // Asegúrate de usar el mismo nombre aquí
        console.log("Estmoas ahi");

        try {
            const { data } = await ApiDelivery.get<{  categories: Category[],success: boolean }>('user/getCategory');
            console.log("Data:", data);
            if (data.success) {
                console.log("Category data:", data.categories); // Add this line to log the Category data
                return Promise.resolve(data.categories);
            } else {
                // Handle unsuccessful response
                return Promise.reject("Failed to fetch Category");
            }
        } catch (error) {
            // Handle network errors or other issues
            return Promise.reject("Failed to fetch Category");
        }
    }

    async createCategory(category: Category): Promise<boolean> {
        try {
            console.log("Category data:", category);
            // Realizar una solicitud al backend para crear la categoría
            const response = await ApiDelivery.post<{ success: boolean }>('user/createCategory', category);
            console.log("Category data:", category);
    
            if (response.data.success) {
                console.log("Category created successfully");
                return true;
            } else {
                // Handle unsuccessful response
                throw new Error("Failed to create category");
            }
        } catch (error) {
            // Handle network errors or other issues
            throw new Error("Failed to create category");
        }
    }
    
}