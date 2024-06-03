import { useState, useEffect } from 'react';
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';

interface CategoryViewModel {
    category: Category[];
    loading: boolean;
    error: string | null;
    fetchCategory: () => void;
}

export const useCategoryViewModel = (): CategoryViewModel => {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const categoryList = await GetCategorysUseCase();
            if (Array.isArray(categoryList)) {
                setCategory(categoryList);
            } else {
                setError("Invalid data format");
                console.error("Invalid data format");
            }
        } catch (error) {
            setError("Failed to fetch category");
            console.error("Failed to fetch category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return { category, loading, error, fetchCategory };
};