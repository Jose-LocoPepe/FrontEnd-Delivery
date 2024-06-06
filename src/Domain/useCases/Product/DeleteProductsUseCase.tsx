import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { deleteProduct } = new ProductRepositoryImpl();

export const deleteProductUseCase = async (product: Product, token: string): Promise<void> => {
    try {
        await deleteProduct(product, token);
    } catch (error) {
        throw new Error("Failed to delete product");
    }
};