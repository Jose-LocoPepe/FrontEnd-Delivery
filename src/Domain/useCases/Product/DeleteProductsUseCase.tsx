import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { Product } from "../../entities/Product";

const { deleteProduct } = new ProductRepositoryImpl();

export const deleteProductUseCase = async (id: string, token: string) => {
    try {
       return await deleteProduct(id, token);
    } catch (error) {
        throw new Error("Failed to delete product");
    }
};