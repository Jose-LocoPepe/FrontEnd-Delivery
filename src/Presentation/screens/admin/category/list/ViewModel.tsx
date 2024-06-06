import { useState, useEffect, useContext } from 'react';
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';
import { User } from '../../../../../Domain/entities/User';
import { GetAllCategoriesUseCase } from '../../../../../Domain/useCases/Category/GetAllCategoriesUseCase';
import { CategoryContext } from '../../../../context/categories/CategoryContext';

interface CategoryViewModel {
    category: Category[];
    loading: boolean;
    error: string | null;
    fetchCategory: () => void;
}

const useCategoryViewModel = () => {

    const { categories, getAllCategories, removeCategory } = useContext(CategoryContext);
   // const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // user

    const fetchCategory = async () => {
        try {
            setLoading(true);
                
        } catch (error) {
            setError("Failed to fetch categories");
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    }
    const deleteCategory = async (id: string) => {
        try {
            setLoading(true);
            const response = await removeCategory(id);
            if (response) {
                updateListCategory();
            } else {
                setError("Category not found");
            }
        } catch (error) {
            setError("Failed to delete category");
            console.error("Failed to delete category:", error);
        } finally {
            setLoading(false);
        }
    
    }
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
    }


    useEffect(() => {
        fetchCategory();
    }, []);

    return { categories, loading,  error, fetchCategory, deleteCategory, updateListCategory,getAllCategories }
}

export default useCategoryViewModel;