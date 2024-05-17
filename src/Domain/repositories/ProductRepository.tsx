import { ResponseVerifyTokenAPIDelivery } from '../../Data/sources/remote/api/models/ResponseVerifyTokenApiDelivery';
import { Product } from '../entities/Product';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    CreateProduct(product: Product): Promise<void>;
}