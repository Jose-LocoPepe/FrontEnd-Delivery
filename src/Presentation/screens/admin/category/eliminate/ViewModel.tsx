import { useState, useEffect } from 'react';
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase';
import { deleteCategoryUseCase } from '../../../../../Domain/useCases/Category/DeleteCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';

interface DeleteCategoryViewModel {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => void;
    deleteCategory: (categoryId: string) => void;
}

export const useDeleteCategoryViewModel = (): DeleteCategoryViewModel => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const categoryList = await GetCategorysUseCase();
            if (Array.isArray(categoryList)) {
                setCategories(categoryList);
            } else {
                setError("Invalid data format");
            }
        } catch (error) {
            setError("Failed to fetch categories");
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId: string) => {
        try {
            setLoading(true);
            const categoryToDelete = categories.find(category => category.id === categoryId);
            if (categoryToDelete) {
                await deleteCategoryUseCase(categoryToDelete);
                fetchCategories(); // Refresh the categories after deletion
            } else {
                setError("Category not found");
            }
        } catch (error) {
            setError("Failed to delete category");
            console.error("Failed to delete category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, fetchCategories, deleteCategory };
};