import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import { ProductPictures } from "../../entities/ProductPictures";

const { getPictures } = new ProductRepositoryImpl();

export const getPicturesUseCase = async (): Promise<ProductPictures[]> => {
    return await getPictures();
}