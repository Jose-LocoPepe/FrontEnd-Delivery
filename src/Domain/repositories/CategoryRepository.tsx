import { ResponseAPIDelivery } from '../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { Category } from '../entities/Category';

export interface CategoryRepository {
   
    getAllCategories(token: string): Promise<ResponseAPIDelivery>;
    createCategory(category: Category, token: string): Promise<ResponseAPIDelivery>;
    deleteCategory(id: string, token: string): Promise<ResponseAPIDelivery>;
    updateCategory(category: Category,id:string, token: string): Promise<ResponseAPIDelivery>;
}