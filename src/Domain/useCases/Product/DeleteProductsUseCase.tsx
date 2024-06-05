import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { deleteProduct } = new ProductRepositoryImpl();

export const DeleteProductUseCase = async (product: Product): Promise<boolean> => {
    return await deleteProduct(product);
}