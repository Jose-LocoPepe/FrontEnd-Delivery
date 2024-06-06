import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import { ProductPictures } from "../../entities/ProductPictures";

const { getPictures, getProducts } = new ProductRepositoryImpl();
