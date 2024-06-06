import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { createProduct } = new ProductRepositoryImpl();

export const CreateProductUseCase = async (product: Product, token: string) => {
    return await createProduct(product, token);
};