
import { ResponseAPIDelivery } from '../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { Product } from '../entities/Product';
import { ProductPictures } from '../entities/ProductPictures';

export interface ProductRepository {
    getProducts(token: string): Promise<ResponseAPIDelivery>;
    getPictures(): Promise<ProductPictures[]>;
    createProduct(product: Product, token: string): Promise<ResponseAPIDelivery>;
    deleteProduct(id: string, token: string): Promise<ResponseAPIDelivery>;
    updateProduct(product: Product, token: string): Promise<ResponseAPIDelivery>;
}

