import { AxiosError } from 'axios';
import { Category } from '../../Domain/entities/Category';
import { CategoryRepository } from '../../Domain/repositories/CategoryRepository';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseAPIDelivery } from '../sources/remote/api/models/ResponseAPIDelivery';


export class CategoryRepositoryImpl implements CategoryRepository {
    async getCategoryById(id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `category/get/${id}`;
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>(path, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
    async getAllCategories(token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>('category/getCategories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
             console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async createCategory(category: Category, token: string): Promise<ResponseAPIDelivery> {
        try {
            console.log(token);
            const { data } = await ApiDelivery.post('category/create', category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            //console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
    

    async updateCategory(category: Category, id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `category/${id}`;
            const { data } = await ApiDelivery.put(path, category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async deleteCategory(id: string, token: string): Promise<ResponseAPIDelivery> {

        try {
            const path = `category/deactivate`
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>(path,{id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            // console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

}

/*
export class CategoryRepositoryImpl implements CategoryRepository {

    async getAllCategories(token:string): Promise<ResponseAPIDelivery> { // Asegúrate de usar el mismo nombre aquí

        try {
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>('user/getCategory');
       
            if (data.success) {
           //     console.log("Category data:", data.categories); // Add this line to log the Category data
                return Promise.resolve(data);
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
      
            const response = await ApiDelivery.post<{ success: boolean }>('user/createCategory', category);
           // console.log("Category data:", category);
    
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
    async deleteCategory(category: Category): Promise<boolean> {
        try {
            // Realizar una solicitud al backend para crear la categoría
            const response = await ApiDelivery.post<{ success: boolean }>('user/deleteCategory', category);
            console.log("Category data:", category);
    
            if (response.data.success) {
                console.log("Category deleted successfully");
                return true;
            } else {
                // Handle unsuccessful response
                throw new Error("Failed to delete category");
            }
        } catch (error) {
            // Handle network errors or other issues
            throw new Error("Failed to delete category");
        }
    }
    
}*/