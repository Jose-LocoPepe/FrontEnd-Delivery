import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { updateProduct } = new ProductRepositoryImpl();

export const UpdateProductUseCase = async (product: Product, token: string) => {
    return await updateProduct(product, token);
}
