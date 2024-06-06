import { ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { Category } from "../../../Domain/entities/Category";
import { createContext, useContext, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { GetAllCategoriesUseCase } from "../../../Domain/useCases/Category/GetAllCategoriesUseCase";
import { UserContext } from "../auth/UserContext";
import { UpdateFileUseCase } from "../../../Domain/useCases/File/UpdateFileUseCase";
import { deleteCategoryUseCase } from "../../../Domain/useCases/Category/DeleteCategoryUseCase";
import { CreateCategoryUseCase } from "../../../Domain/useCases/Category/CreateCategoryUseCase";
import { UpdateCategoryUseCase } from "../../../Domain/useCases/Category/UpdateCategoryUseCase";
import { GetCategoryIdUseCase } from "../../../Domain/useCases/Category/GetCategoryByIdUseCase";

interface CategoryContextProps {
    categories: Category[];
    getAllCategories(): Promise<void>;
    getCategoryById(id: string): Promise<ResponseAPIDelivery>;
    createCategory(category: Category, file:ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateCategory(category: Category, file: ImagePicker.ImageInfo, id: string): Promise<ResponseAPIDelivery>;
    removeCategory(id: string): Promise<ResponseAPIDelivery>;
    updateFile?(file: ImagePicker.ImageInfo, collection: string, id: string): Promise<ResponseAPIDelivery>;
}


export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {
    
    const [categories, setCategories] = useState<Category[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(categories.length === 0) getAllCategories();
    }, []);
    const getAllCategories = async (): Promise<void> => {
        try{
            const response = await GetAllCategoriesUseCase(user.session_token);
            if(response.data){
               
                setCategories(response.data);
            }
        }catch(error){
            setCategories([]);
        }
    }
    const getCategoryById = async (id: string): Promise<ResponseAPIDelivery> => {
        try {
            const response = await GetCategoryIdUseCase(id, user.session_token);
            return response;
        } catch (error) {
            return { success: false, message: "Failed to get category" };
        }
    }
    const createCategory = async (category: Category, file: ImagePicker.ImageInfo) => {
        const response = await CreateCategoryUseCase(category, user.session_token);
        if (response.success) {
            // Call to update file image
            await updateFile(file!, 'categories', response.data.id);
        }
        // Refresh list category
        getAllCategories();
        return response;
    }

    const updateCategory = async (category: Category, file: ImagePicker.ImageInfo, id: string) => {
        const response = await UpdateCategoryUseCase(category, id, user.session_token);
        if (response.success) {
            if (file !== undefined) {
                await updateFile(file!, 'categories', id);
            }
            getAllCategories();
        }

        return response;
    }


    // Desactivar una categoría
    const removeCategory = async (id: string):Promise<ResponseAPIDelivery> => {
        try {
            const response = await deleteCategoryUseCase(id, user.session_token);
            if(response.success){
                await getAllCategories();
                console.log("Category deleted");
            }
            return response;
        } catch (error) {
            return { success: false, message: "Failed to delete category" };
        }
    }
    

    const updateFile = async (file: ImagePicker.ImageInfo, collection: string, id: string) => {
        await UpdateFileUseCase(file, collection, id);
    }
    return (
        <CategoryContext.Provider
            value={{
                categories,
                getAllCategories,
                createCategory,
                getCategoryById,
                updateCategory,
                removeCategory,
                updateFile
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}