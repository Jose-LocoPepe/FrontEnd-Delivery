import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { createProduct } = new ProductRepositoryImpl();

export const CreateProductUseCase = async (newproduct: Product): Promise<boolean> => {
    return await createProduct(newproduct);
}