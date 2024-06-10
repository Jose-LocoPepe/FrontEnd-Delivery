import { useState, useEffect, useContext } from 'react';
import { Product } from '../../../../../Domain/entities/Product';
import { getProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase'; // Import GetProductsUseCase
import { ProductContext } from '../../../../context/products/ProductContext';
import { CategoryContext } from '../../../../context/categories/CategoryContext';
import { showMessage } from 'react-native-flash-message';
import { getFirstImageUseCase } from '../../../../../Domain/useCases/Product/GetFirstImageUseCase';

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}

export const useProductViewModel = () => {
    // Get categories from CategoryContext

    const { products, getAllProducts, removeProduct, sortProducts } = useContext(ProductContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

    
    const [firstPic, setFirstPic] = useState<string[] | null>([]);

    const setCategoryName = (idCategory: string):Promise<string> => {
        return new Promise((resolve, reject) => {
            const category = categories.find((category) => category.id === idCategory);
            if (category) {
                resolve(category.name);
            } 
        });
    }


    const firstImage = async (id: string) => {  
        try {
            setLoading(true);
            console.log("id:", id);
            const response = await getFirstImageUseCase(id);
            if (response.success) {

                setFirstPic(response.data.image);
            } else {
                setError("Product not found");
            }
        } catch (error) {
            setError("Failed to get first image");
            console.error("Failed to get first image:", error);
        } finally {
            setLoading(false);
        }
    }
    const deleteProduct = async (id: string) => {
        try {
            setLoading(true);
            const response = await removeProduct(id);
            if (response.success) {
                setLoading(false);
                    showMessage({
                        message: 'Producto eliminado',
                        description: 'El producto se ha eliminado correctamente',
                        type: 'success',
                    });
                updateListProducts();
            } else {
                setError("Product not found");
            }
        } catch (error) {
            setError("Failed to delete product");
            console.error("Failed to delete product:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateListProducts = async () => {
        try {
            setLoading(true);
            await getAllProducts();
        } catch (error) {
            setError("Failed to update products");
            console.error("Failed to update products:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateListCategory = async () => {
        try {
            setLoading(true);
            await getAllCategories();
        } catch (error) {
            setError("Failed to update categories");
            console.error("Failed to update categories:", error);
        } finally {
            setLoading(false);
        }
    };

    // Use ef
    
    useEffect(() => {
        updateListProducts();
        
    }, []);

    return { products, firstImage,setCategoryName,firstPic,loading, error, categories, sortProducts, deleteProduct, updateListCategory, getAllCategories, updateListProducts, sortBy, setSortBy };
};
