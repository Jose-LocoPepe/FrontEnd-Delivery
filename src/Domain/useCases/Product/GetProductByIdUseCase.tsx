import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { getProductById } = new ProductRepositoryImpl();

export const GetProductByIdUseCase = async (id: string, token: string) => {
    return await getProductById(id, token);
};
