import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../../../Domain/entities/Product";
import { UserContext } from "../auth/UserContext";
import * as ImagePicker from 'expo-image-picker';
import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { getProductsUseCase } from "../../../Domain/useCases/Product/GetProductsUseCase";
import { CreateProductUseCase } from "../../../Domain/useCases/Product/CreateProductUseCase";
import { UpdateProductUseCase } from "../../../Domain/useCases/Product/UpdateProductUseCase";
import { deleteProductUseCase } from "../../../Domain/useCases/Product/DeleteProductsUseCase";
import { UpdateFileUseCase } from "../../../Domain/useCases/File/UpdateFileUseCase";

interface ProductContextProps {
    products: Product[];
    getAllProducts(): Promise<void>;
    createProduct(product: Product, file1: ImagePicker.ImageInfo, file2: ImagePicker.ImageInfo, file3: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery> ;
    //createProduct(product: Product, file: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateProduct(product: Product, file: ImagePicker.ImageInfo, id: string): Promise<ResponseAPIDelivery>;
    removeProduct(id: string): Promise<ResponseAPIDelivery>;
    updateFile?(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery>;
    sortProducts(criteria: 'name' | 'price'): void;
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

    const createProduct = async (product: Product, file1: ImagePicker.ImageInfo, file2: ImagePicker.ImageInfo, file3: ImagePicker.ImageInfo) => {
        const response = await CreateProductUseCase(product, user.session_token);
        console.log('response:', response)
        if (response.success) {
            // crear 3 imagenes
            if (file1 !== undefined) {
                await updateFile(file1!, 'productsImages', response.image1.id);
            }
            if (file2 !== undefined) {
                await updateFile(file2!, 'productsImages', response.image2.id);
            }
            if (file3 !== undefined) {
                await updateFile(file3!, 'productsImages', response.image3.id);
           }
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
    const sortProducts = (criteria: 'name' | 'price') => {
        const sortedProducts = [...products].sort((a, b) => {
            if (criteria === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                return parseInt(a.price) - parseInt(b.price);
            }
        });
        setProducts(sortedProducts);
    }

    const removeProduct = async (id: string) => {
        const response = await deleteProductUseCase(id, user.session_token);
        getAllProducts();
        return response;
    }

    const updateFile = async (file: ImagePicker.ImageInfo, collection: string, id: string) => {
        await UpdateFileUseCase(file, collection, id);
    }
    


    return (
        <ProductContext.Provider value={{ 
            products, 
            getAllProducts,
            createProduct, 
            updateProduct, 
            removeProduct,
            sortProducts
        }}>
            {children}
        </ProductContext.Provider>
    )

}