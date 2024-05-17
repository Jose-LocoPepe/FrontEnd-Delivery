import { useState, Dispatch, SetStateAction } from 'react';
import { CreateProductUseCase } from '../../../../../Domain/useCases/Product/CreateProductUseCase';
import { Product } from '../../../../../Domain/entities/Product';

interface CreateProductViewModel {
    loading: boolean;
    error: string | null;
    createProduct: () => Promise<boolean>; // Define createProduct function
    newProductData: Product; // Product data to be input by the user
    setNewProductData: Dispatch<SetStateAction<Product>>; // Adjust the type here
}

export const useCreateProductViewModel = (): CreateProductViewModel => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newProductData, setNewProductData] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        categoryid: 1 // Assuming categoryId is a required field, you might need to adjust this
    });

    const createProduct = async (): Promise<boolean> => {
        try {
            setLoading(true);
            await CreateProductUseCase(newProductData);
            setLoading(false);
            return true;
        } catch (error) {
            setError("Failed to create product");
            setLoading(false);
            return false;
        }
    };

    return { loading, error, createProduct, newProductData, setNewProductData };
};