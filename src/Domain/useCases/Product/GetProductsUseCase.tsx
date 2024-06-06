import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const { getProducts } = new ProductRepositoryImpl();

export const getProductsUseCase = async (token: string) => {
    return await getProducts(token);
}