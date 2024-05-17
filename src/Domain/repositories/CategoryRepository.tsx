import { ResponseVerifyTokenAPIDelivery } from '../../Data/sources/remote/api/models/ResponseVerifyTokenApiDelivery';
import { Category } from '../entities/Category';

export interface CategoryRepository {
    getCategories(): Promise<Category[]>;
    createCategory(category: Category): Promise<boolean>;
}