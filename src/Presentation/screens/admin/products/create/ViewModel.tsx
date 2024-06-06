import { useState, useEffect, useContext } from 'react';
import { CreateProductUseCase } from '../../../../../Domain/useCases/Product/CreateProductUseCase';
import { Product } from '../../../../../Domain/entities/Product';

import { Category } from '../../../../../Domain/entities/Category'; // Import Category entity
import { GetCategorysUseCase } from '../../../../../Domain/useCases/Category/GetCategoryUseCase';
import { CategoryContext } from '../../../../context/categories/CategoryContext';
import { ProductContext } from '../../../../context/products/ProductContext';
import { ImagePickerAsset } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

import { showMessage } from 'react-native-flash-message';


interface Values{
    name: string;
    description: string;
    price: string;
    categoryId: string;
}

const validationCreateProductSchema = yup.object().shape({
    name: yup.string().required('El nombre del producto es requerido'),
    description: yup.string().required('La descripción del producto es requerida'),
    price: yup.string().required('El precio del producto es requerido'),
    categoryId: yup.string().required('La categoría del producto es requerida')
});
export const useCreateProductViewModel = () => {

    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<ImagePicker.ImageInfo>();

    const [values, setValues] = useState<Values>({
        name: '',
        description: '',
        price: '',
        categoryId: '',
    });
   
    const { categories } = useContext(CategoryContext);

    const { products, createProduct } = useContext(ProductContext);

    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(''); // State for selected category name
    const [selectedIdCategory, setSelectedIdCategory] = useState<string>(''); // State for selected category id
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

    //Crear producto
    const create = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            try {
                setLoading(true);
                const {...data } = values;
                const response = await createProduct(data, file!);
                if (response) {
                    showMessage({
                        message: 'Producto creado',
                        type: 'success',
                    });
                    setValues({
                        name: '',
                        description: '',
                        price: '',
                        categoryId: '',
                    });
                    
                } else {
                    setError('Error al crear producto');
                }
                setLoading(false);
            } catch (error) {
                console.log("xd",error);
                setLoading(false);
            }
        }
    }
    
    //Validar formulario
    const isValidForm = async () => {
        try {
            await validationCreateProductSchema.validate(values, { abortEarly: false });
            setErrorMessages({});
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((error: yup.ValidationError) => {
                errors[error.path!] = error.message;
            });
            setErrorMessages(errors);
            return false;
        }
    }
    
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

    return {
        ...values,
        loading,
        error,
        onChange,
        create,
        errorMessages,
        categories,
        selectedCategoryName,
        setSelectedCategoryName
    };
};
