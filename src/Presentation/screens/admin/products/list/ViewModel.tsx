import { useState, useEffect, useContext } from 'react';
import { Product } from '../../../../../Domain/entities/Product';
import { GetProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase'; // Import GetProductsUseCase
import { ProductContext } from '../../../../context/products/ProductContext';
import { CategoryContext } from '../../../../context/categories/CategoryContext';

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}

export const useProductViewModel = () => {
    const { products, getAllProducts, removeProduct, sortProducts } = useContext(ProductContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

    const deleteProduct = async (id: string) => {
        try {
            setLoading(true);
            const response = await removeProduct(id);
            if (response) {
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

    useEffect(() => {
        updateListProducts();
    }, []);

    return { products, loading, error, categories, sortProducts, deleteProduct, updateListCategory, getAllCategories, updateListProducts, sortBy, setSortBy };
};
