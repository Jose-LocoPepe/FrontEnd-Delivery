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
import { GetProductByIdUseCase } from "../../../Domain/useCases/Product/GetProductByIdUseCase";
interface ProductContextProps {
    products: Product[];
    getAllProducts(): Promise<void>;
    getResponseAllProducts() : Promise<ResponseAPIDelivery>;
    getProductById(id: string): Promise<ResponseAPIDelivery>;
    createProduct(product: Product, file1: ImagePicker.ImageInfo, file2: ImagePicker.ImageInfo, file3: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery> ;
    //createProduct(product: Product, file: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateProduct(product: Product, file1: ImagePicker.ImageInfo,file2: ImagePicker.ImageInfo, file3:ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    removeProduct(id: string): Promise<ResponseAPIDelivery>;

    updateFile?(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery>;
    sortProducts(criteria: 'name' | 'price'): void;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useContext(UserContext);   

    const getResponseAllProducts = async (): Promise<ResponseAPIDelivery>=>{
        try{
            const response = await getProductsUseCase(user.session_token);
            return response;
        }catch(error){
            return {success: false, message: "Failed to get Products"};
        }
    }

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
    const getProductById = async (id: string): Promise<ResponseAPIDelivery> => {
        try {
            const response = await GetProductByIdUseCase(id, user.session_token);
            
            return response;
        } catch (error) {
            console.log('error:', error);
            return { success: false, message: "Failed to get Product" };
        }
    }

    const createProduct = async (product: Product, file1: ImagePicker.ImageInfo, file2: ImagePicker.ImageInfo, file3: ImagePicker.ImageInfo) => {
        const response = await CreateProductUseCase(product, user.session_token);
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



    const updateProduct = async (product: Product, file1: ImagePicker.ImageInfo,file2: ImagePicker.ImageInfo, file3:ImagePicker.ImageInfo) => {
        
        const response = await UpdateProductUseCase(product, user.session_token!);
        if (response.success) {
            /*const responseImages = await getProductImagesUseCase(product.id!);
            if (file1 !== undefined) {
                await updateFile(file1!, 'productsImages', responseImages[0].id);
            }
            if (file2 !== undefined) {
                await updateFile(file2!, 'productsImages', responseImages[1].id);
            }
            if (file3 !== undefined) {
                await updateFile(file3!, 'productsImages', responseImages[2].id);
        }*/
            getAllProducts();
        }
        return response;
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
  
    const removeProduct = async (id: string):Promise<ResponseAPIDelivery> => {
    try{
        const response = await deleteProductUseCase(id, user.session_token);
        if(response.success){
            await getAllProducts();
            return response;
        }
        return response;
    } catch (error) {
        return { success: false, message: "Failed to delete product" };
    }
}

    const updateFile = async (file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery> => {
        try {
            const response = await UpdateFileUseCase(file, collection, id, user.session_token);
            return response;
        } catch (error) {
            return { success: false, message: "Failed to update file" };
        }
    }
    


    return (
        <ProductContext.Provider 
        value={{ 
            products, 
            getAllProducts,
            createProduct, 
            updateProduct, 
            removeProduct,
            getResponseAllProducts,
            sortProducts,
            getProductById,
        }}>
            {children}
        </ProductContext.Provider>
    )

}