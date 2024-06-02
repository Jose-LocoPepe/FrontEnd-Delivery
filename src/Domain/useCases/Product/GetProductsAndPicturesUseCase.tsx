import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import { ProductPictures } from "../../entities/ProductPictures";

const { getPictures, getProducts } = new ProductRepositoryImpl();

export const GetProductsAndPicturesUseCase = async (): Promise<(Product & { pictures: ProductPictures[] })[]> => {
    const products = await getProducts();
    const pictures = await getPictures();

    return products.map(product => ({
        ...product,
        pictures: pictures.filter(picture => picture.productId === Number(product.id))
    }));
}
