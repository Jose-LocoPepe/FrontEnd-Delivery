import { useState, useEffect, useContext } from 'react';
import { Product } from '../../../../../Domain/entities/Product';
import { getProductsUseCase } from '../../../../../Domain/useCases/Product/GetProductsUseCase'; // Import GetProductsUseCase
import { ProductContext } from '../../../../context/products/ProductContext';
import { CategoryContext } from '../../../../context/categories/CategoryContext';
import { showMessage } from 'react-native-flash-message';

export enum SortBy {
    NAME = "NAME",
    PRICE = "PRICE"
}
// Values Image1, Image2, Image3
interface ImagesValue{
    product_id: string;
    image1: string;
    image2: string;
    image3: string;
}

export const useProductViewModel = () => {
    // Get categories from CategoryContext

    const { products, getProductById,getResponseAllProducts, getAllProducts, removeProduct, sortProducts } = useContext(ProductContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);

    const [images, setImages] = useState<{ [productId: string]: string }>({});



    // Estado para guardar la primera imagen de un producto
    const [firstPic, setFirstPic] = useState<string[] | null>([]);


    const setCategoryName = (idCategory: string):Promise<string> => {
        return new Promise((resolve, reject) => {
            const category = categories.find((category) => category.id === idCategory);
            if (category) {
                resolve(category.name);
            } 
        });
    }
    const fetchImages = async() => {
        // obtener las primeras imagenes de todos los productos
        try{
            const response = await getResponseAllProducts();
            if(response.data){
                // obtener las primeras imagenes de todos los productos
                response.data.forEach((product: Product) => {
                    setFirstPic(response.data.product.images[0]);
                });
            }
        } catch{
            console.error("Failed to fetch images");
            
        }
    }
    const fetchFirstImage = async (productId: string) => {
        try {
            const response = await getProductById(productId);
            if (response.data.length > 0) {
                const imagesProduct = {...images, [productId]: response.data[0].product.images[0]};
                setImages(imagesProduct);
            }
        } catch (error) {
            console.error("Failed to fetch first image:", error);
        }
    };

    const firstImage = async (id: string) => {
        try {
            setLoading(true);
            const response = await getProductById(id);
            if (response.data) {
                setFirstPic(response.data.product.images[0]);
            }
        }
        catch (error) {
            setError("Failed to get first image");
            console.error("Failed to get first image:", error);
        } finally {
            setLoading(false);
        }
    }
    const deleteProduct = async (id: string) => {
        try {
            setLoading(true);
            const response = await removeProduct(id);
            if (response.success) {
                setLoading(false);
                    showMessage({
                        message: 'Producto eliminado',
                        description: 'El producto se ha eliminado correctamente',
                        type: 'success',
                    });
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
            console.log(products);
            
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

    // Use effect getImages
    
    
    useEffect(() => {
        updateListProducts();
    }, []);

    return { products, firstImage,setCategoryName,firstPic,loading, error, categories, sortProducts, deleteProduct, updateListCategory, getAllCategories, updateListProducts, sortBy, setSortBy };
};
