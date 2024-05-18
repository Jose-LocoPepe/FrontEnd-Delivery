import { useState, Dispatch, SetStateAction } from 'react';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/Category/CreateCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';

interface CreateCategoryViewModel {
    loading: boolean;
    error: string | null;
    createCategory: () => Promise<boolean>; // Define createCategory function
    newCategoryData: Category; // Category data to be input by the user
    setNewCategoryData: Dispatch<SetStateAction<Category>>; // Adjust the type here
}

export const useCreateCategoryViewModel = (): CreateCategoryViewModel => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newCategoryData, setNewCategoryData] = useState<Category>({
        name: "",
        description: ""
    });

    const createCategory = async (): Promise<boolean> => {
        try {
            setLoading(true);
            await CreateCategoryUseCase(newCategoryData);
            setLoading(false);
            return true;
        } catch (error) {
            setError("Failed to create category");
            setLoading(false);
            return false;
        }
    };

    return { loading, error, createCategory, newCategoryData, setNewCategoryData };
};
