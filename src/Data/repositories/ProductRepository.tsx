import { AxiosError } from 'axios';
import { Product } from '../../Domain/entities/Product';
import { ProductRepository } from '../../Domain/repositories/ProductRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseVerifyTokenAPIDelivery } from '../sources/remote/api/models/ResponseVerifyTokenApiDelivery';



export class ProductRepositoryImpl implements ProductRepository {


async getProducts(): Promise<Product[]> {
    try {
        const { data } = await ApiDelivery.get<{ success: boolean, products: Product[] }>('user/getProducts');

        if (data.success) {
            console.log("Products data:", data.products); // Add this line to log the products data
            return Promise.resolve(data.products);
        } else {
            // Handle unsuccessful response
            return Promise.reject("Failed to fetch products");
        }
    } catch (error) {
        // Handle network errors or other issues
        return Promise.reject("Failed to fetch products");
    }
}


async CreateProduct(): Promise<void> {
    
}

}