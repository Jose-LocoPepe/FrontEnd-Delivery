import { useState, useEffect } from 'react';
import { CreateProductUseCase } from '../../../../../Domain/useCases/Product/CreateProductUseCase';
import { Product } from '../../../../../Domain/entities/Product';
import { useCategoryViewModel } from '../../category/list/ViewModel'; // Import Category ViewModel
import { Category } from '../../../../../Domain/entities/Category'; // Import Category entity
interface Values{
    name: string;
    description: string;
    price: string;
    categoryId: string;
}
interface CreateProductViewModel {
    loading: boolean;
    error: string | null;
    createProduct: () => void;
    onChange: (property: string, value: any) => void;
    errorMessages: Record<string, string>;
    categories: Category[]; // Add categories
    selectedCategoryName: string; // Add selectedCategoryName
}

export const useCreateProductViewModel = (): CreateProductViewModel => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [values, setValues] = useState<Values>({
        name: '',
        description: '',
        price: '',
        categoryId: '',
    });
    /*
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
    */
    const [categories, setCategories] = useState<Category[]>([]); // State for categories
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(''); // State for selected category name

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    const { category, loading: categoryLoading, error: categoryError, fetchCategory } = useCategoryViewModel(); // Fetch category list

    useEffect(() => {
        fetchCategory(); // Fetch categories on component mount
    }, []);

    useEffect(() => {
        if (!categoryLoading && !categoryError) {
            setCategories(category); // Set categories if fetched successfully
        }
    }, [categoryLoading, categoryError, category]);

    useEffect(() => {
        if (values.categoryId) {
            const selectedCategory = categories.find(cat => cat.id === categoryId);
            if (selectedCategory) {
                setSelectedCategoryName(selectedCategory.name);
            }
        }
    }, [values.categoryId, categories]);

    const onChange = (property: string, value: any) => {
        if(property === 'price'){
            const numericValue = parseFloat(value);
            if(!isNaN(numericValue) && numericValue >= 0 && numericValue <= 999999){
                setValues({ ...values, [property]: value });
            }
        } else {
        setValues({ ...values, [property]: value });
        }
    };

/*
    const onChange = (property: string, value: any) => {
        if (property === 'price') {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 999999) {
                setPrice(value);
            }
        } else {
            switch (property) {
                case 'name':
                    setName(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'categoryId':
                    setCategoryId(value);
                    break;
                default:
                    break;
            }
        }
    };
*/
    const createProduct = async () => {
        if (!name || !description || !price || !categoryId) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);

        try {
            const newProduct: Product = {
                name,
                description,
                price: parseFloat(price),
                categoryId,
            };
            const success = await CreateProductUseCase(newProduct);
            if (success) {
                setName('');
                setDescription('');
                setPrice('');
                setCategoryId('');
                setError(null);
                setErrorMessages({});
                console.log('Product created successfully.');
            } else {
                setError('Failed to create product.');
            }
        } catch (error) {
            setError('An error occurred while creating product.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createProduct,
        name,
        description,
        price,
        categoryId,
        onChange,
        errorMessages,
        categories,
        selectedCategoryName,
    };
};
