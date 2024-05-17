import { useState, useEffect } from 'react';
import * as yup from 'yup'
import { GetProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase';
import { Product } from '../../../../../Domain/entities/Product';

interface ProductViewModel {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void; // Define fetchProducts function
}

export const useProductViewModel = (): ProductViewModel => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productList = await GetProductsUseCase();
            setProducts(productList);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, fetchProducts }; // Return fetchProducts in the object
};