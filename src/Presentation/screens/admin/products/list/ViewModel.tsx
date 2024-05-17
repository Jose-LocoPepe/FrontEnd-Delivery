import { useState, useEffect } from 'react';
import { GetProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase';
import { Product } from '../../../../../Domain/entities/Product';

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}

interface ProductViewModel {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void; // Define fetchProducts function
    sortBy: SortBy;
    setSortBy: (sortBy: SortBy) => void;
}

export const useProductViewModel = (): ProductViewModel => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

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

    useEffect(() => {
        if (sortBy === SortBy.NAME) {
            setProducts([...products.sort((a, b) => a.name.localeCompare(b.name))]);
        } else if (sortBy === SortBy.PRICE) {
            setProducts([...products.sort((a, b) => a.price - b.price)]);
        }
    }, [sortBy]);

    return { products, loading, error, fetchProducts, sortBy, setSortBy };
};