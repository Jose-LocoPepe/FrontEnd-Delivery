import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { getProducts } = new ProductRepositoryImpl();

export const GetProductsUseCase = async (): Promise<Product[]> => {
    return await getProducts();
}