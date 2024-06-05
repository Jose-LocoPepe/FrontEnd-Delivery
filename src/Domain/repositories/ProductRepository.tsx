
import { Product } from '../entities/Product';
import { ProductPictures } from '../entities/ProductPictures';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    getPictures(): Promise<ProductPictures[]>;
    createProduct(Product: Product): Promise<boolean>;
    deleteProduct(Product: Product): Promise<boolean>;
}