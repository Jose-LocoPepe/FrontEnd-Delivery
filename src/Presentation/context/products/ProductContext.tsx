import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../../../Domain/entities/Product";
import { UserContext } from "../auth/UserContext";
import * as ImagePicker from 'expo-image-picker';
import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { getProductsUseCase } from "../../../Domain/useCases/Product/GetProductsUseCase";
import { CreateProductUseCase } from "../../../Domain/useCases/Product/CreateProductUseCase";
import { UpdateProductUseCase } from "../../../Domain/useCases/Product/UpdateProductUseCase";
import { deleteProductUseCase } from "../../../Domain/useCases/Product/DeleteProductsUseCase";

interface ProductContextProps {
    products: Product[];
    getAllProducts(): Promise<void>;
    createProduct(product: Product, file: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateProduct(product: Product, file: ImagePicker.ImageInfo, id: string): Promise<ResponseAPIDelivery>;
    removeProduct(id: string): Promise<ResponseAPIDelivery>;
    updateFile?(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery>;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(products.length === 0) getAllProducts();
    }, []);
    const getAllProducts = async (): Promise<void> => {
        try{
            const response = await getProductsUseCase(user.session_token);
           
            if(response.data){
                setProducts(response.data);
               
            }
        }catch(error){
            setProducts([]);
        }
    }

    const createProduct = async (product: Product, file: ImagePicker.ImageInfo) => {
        const response = await CreateProductUseCase(product, user.session_token);
        if (response.success) {
            // Call to update file image
            //await updateFile(file!, 'products', response.data.id);
        }
        // Refresh list product
        getAllProducts();
        return response;
    }

    const updateProduct = async (product: Product, file: ImagePicker.ImageInfo, id: string) => {
        const response = await UpdateProductUseCase(product, id, user.session_token);
        if (response.success) {
            if (file !== undefined) {
                await updateFile(file!, 'products', id);
            }
            getAllProducts();
        }
    }

    const removeProduct = async (id: string) => {
        const response = await deleteProductUseCase(id, user.session_token);
        getAllProducts();
        return response;
    }

    return (
        <ProductContext.Provider value={{ 
            products, 
            getAllProducts, createProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    )

}