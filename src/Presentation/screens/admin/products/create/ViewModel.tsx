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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/tabs/admin/AdminProductNavigator';

interface ImagesValue{
    image1: string;
    image2: string;
    image3: string;

}
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
    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>();

    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [file1, setFile1] = useState<ImagePicker.ImageInfo>();
    const [file2, setFile2] = useState<ImagePicker.ImageInfo>();
    const [file3, setFile3] = useState<ImagePicker.ImageInfo>();
    const [images, setImages] = useState<ImagesValue>({
        image1: '',
        image2: '',
        image3: ''
    });
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
                const response = await createProduct(data, file1!, file2!, file3!);
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
                    navigation.goBack();
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
    const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {

            if (numberImage == 1) {
                onChangeImage('image1', result.assets[0].uri); 
                setFile1(result.assets[0]);
            }
            else if (numberImage == 2) {

                onChangeImage('image2', result.assets[0].uri); 
                setFile2(result.assets[0]);
            }
            else if (numberImage == 3) {

                onChangeImage('image3', result.assets[0].uri); 
                setFile3(result.assets[0]);
            }

        }
    }
    
    const takePhoto = async (numberImage: number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            if (numberImage == 1) {
                onChangeImage('image1', result.assets[0].uri); 
                setFile1(result.assets[0]);
            }
            else if (numberImage == 2) {
                onChangeImage('image2', result.assets[0].uri); 
                setFile2(result.assets[0]);
            }
            else if (numberImage == 3) {
                onChangeImage('image3', result.assets[0].uri); 
                setFile3(result.assets[0]);
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
    const onChangeImage = (property: string, value: any) => {
        setImages({ ...images, [property]: value });
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
        ...images,
        loading,
        error,
        onChange,
        pickImage,
        takePhoto,
        create,
        errorMessages,
        categories,
        selectedCategoryName,
        setSelectedCategoryName
    };
};
