import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { Product } from "../../entities/Product";
import { ProductPictures } from "../../entities/ProductPictures";

const { getFirstPicture } = new ProductRepositoryImpl();

export const getFirstImageUseCase = async (id: string): Promise<ResponseAPIDelivery> => {
    return await getFirstPicture(id);
}