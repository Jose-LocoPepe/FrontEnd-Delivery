import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { Product } from "../../entities/Product";

// Instantiate UserLocalRepositoryImpl
const userLocalRepository = new UserLocalRepositoryImpl();

// Now you can call the getProducts method
export const ProductList = userLocalRepository.getProducts();