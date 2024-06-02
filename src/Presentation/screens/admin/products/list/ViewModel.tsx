import { useState, useEffect } from 'react';
import { GetProductsAndPicturesUseCase } from '../../../../../Domain/useCases/Product/GetProductsAndPicturesUseCase';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductPictures } from '../../../../../Domain/entities/ProductPictures';
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase'; // Import GetCategorysUseCase

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}

export interface ProductWithPictures extends Product {
    pictures: ProductPictures[];
}

interface ProductViewModel {
    products: ProductWithPictures[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void;
    sortBy: SortBy;
    setSortBy: (sortBy: SortBy) => void;
}

export const useProductViewModel = (): ProductViewModel => {
    const [products, setProducts] = useState<ProductWithPictures[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productList = await GetProductsAndPicturesUseCase();
            const categories = await GetCategorysUseCase(); // Fetch categories

            const updatedProducts = productList.map(product => ({
                ...product,
                pictures: product.pictures,
                categoryName: categories.find(category => category.id === product.categoryId)?.name || '' // Find category name by ID or set to empty string if not found
            })).filter(product => product.categoryName); // Filter out products without a valid category name

            if (sortBy === SortBy.NAME) {
                setProducts([...updatedProducts.sort((a, b) => a.name.localeCompare(b.name))]);
            } else if (sortBy === SortBy.PRICE) {
                setProducts([...updatedProducts.sort((a, b) => a.price - b.price)]);
            }
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
        fetchProducts();
    }, [sortBy]);

    return { products, loading, error, fetchProducts, sortBy, setSortBy };
};