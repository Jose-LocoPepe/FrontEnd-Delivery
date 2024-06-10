import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { Product } from "../../entities/Product";
import { ProductPictures } from "../../entities/ProductPictures";

const { getProductImages } = new ProductRepositoryImpl();

export const getProductImagesUseCase = async (id: string): Promise<ResponseAPIDelivery> => {
    return await getProductImages(id);
}