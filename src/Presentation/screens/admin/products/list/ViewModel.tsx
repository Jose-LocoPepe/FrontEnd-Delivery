import { useState, useEffect, useContext } from 'react';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductPictures } from '../../../../../Domain/entities/ProductPictures';
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase'; // Import GetCategorysUseCase
import { ProductContext } from '../../../../context/products/ProductContext';
import { getProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase';
import { CategoryContext } from '../../../../context/categories/CategoryContext';

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}




export const useProductViewModel = () => {
    const { products, getAllProducts, removeProduct, sortProducts } = useContext(ProductContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    //const [products, setProducts] = useState<ProductWithPictures[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

    /*const fetchProducts = async () => {
        try {
            setLoading(true);
            const productList = await getProductsUseCase();
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
    };*/

    //Ordenar por nombre
    /*const sortByName = () => {
        setSortBy(SortBy.NAME);
        fetchProducts();
    };*/

    const onChange = (property: string, value: any) => {
        //setValues({ ...values, [property]: value });
    }
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
    }
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
        updateListProducts();
    }, []);


   return { products, loading, error,categories,sortProducts,deleteProduct, updateListCategory, getAllCategories,updateListProducts, sortBy, setSortBy };
};

export default useProductViewModel;