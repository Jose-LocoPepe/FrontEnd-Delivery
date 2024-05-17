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

async getPictures(): Promise<Product[]> {
    try {
        const { data } = await ApiDelivery.get<{ success: boolean, products: Product[] }>('user/getPictures');

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


async createProduct(Product: Product): Promise<boolean> {
    try {
        console.log("Products data:", Product);
        // Realizar una solicitud al backend para crear el producto
        const response = await ApiDelivery.post<{ success: boolean }>('user/createProduct', Product);
        console.log("Products data:", Product);

        if (response.data.success) {
            console.log("Product created successfully");
            return true;
        } else {
            // Handle unsuccessful response
            throw new Error("Failed to create product");
            return false;
        }
    } catch (error) {
        // Handle network errors or other issues
        throw new Error("Failed to create product");
    }
}

}