import { useState, useEffect } from 'react';
import * as yup from 'yup'
import { ProductList } from 'src/Domain/useCases/Product/ProductUse'; // Update the path accordingly
import { Product } from "../../entities/Product";

interface ProductViewModel {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const ProductViewModel = (): ProductViewModel => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await ProductList;
                setProducts(productList);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default ProductViewModel;