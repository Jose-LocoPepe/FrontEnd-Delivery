import { ResponseAPIDelivery } from '../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { Product } from '../entities/Product';

export interface ProductRepository {
    getProducts(token: string): Promise<ResponseAPIDelivery>;
    getProductImages(id: string): Promise<ResponseAPIDelivery>;
    createProduct(product: Product, token: string): Promise<ResponseAPIDelivery>;
    deleteProduct(id: string, token: string): Promise<ResponseAPIDelivery>;
    updateProduct(product: Product, token: string): Promise<ResponseAPIDelivery>;
    getProductById(id: string, token: string): Promise<ResponseAPIDelivery>;
}
