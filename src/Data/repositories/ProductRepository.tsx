import { AxiosError } from 'axios';
import { Product } from '../../Domain/entities/Product';
import { ProductRepository } from '../../Domain/repositories/ProductRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseVerifyTokenAPIDelivery } from '../sources/remote/api/models/ResponseVerifyTokenApiDelivery';
import { ProductPictures } from '../../Domain/entities/ProductPictures';
import { ResponseAPIDelivery } from '../sources/remote/api/models/ResponseAPIDelivery';





export class ProductRepositoryImpl implements ProductRepository {
    async getProducts(token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>('product/getProducts', {
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



    async createProduct(product: Product, token: string): Promise<ResponseAPIDelivery> {
        try {
            const { data } = await ApiDelivery.post('product/create', product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseVerifyTokenAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    // Get product by id
    async getProductById(id: string, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `product/get/${id}`;
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
    async deleteProduct(id: string, token: string): Promise<ResponseAPIDelivery> {

        try {
            const path = `product/deactivate`
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
    
    async getPictures(): Promise<ProductPictures[]> {
        try {
            const { data } = await ApiDelivery.get<ProductPictures[]>('product/getPictures');

            return Promise.resolve(data);

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async updateProduct(product: Product, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `product/${product.id}`;
            const { data } = await ApiDelivery.put(path, product, {
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

    async updateProductPictures(product: Product, token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `product/${product.id}/pictures`;
            const { data } = await ApiDelivery.put(path, product, {
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
}
