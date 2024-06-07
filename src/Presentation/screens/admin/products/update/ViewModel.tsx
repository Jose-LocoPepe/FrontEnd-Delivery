import { useState, useEffect, useContext } from 'react';
import { Product } from '../../../../../Domain/entities/Product';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { ProductContext } from '../../../../context/products/ProductContext';
import * as ImagePicker from 'expo-image-picker';
import { ValidationError } from 'yup';
import { CategoryContext } from '../../../../context/categories/CategoryContext';

interface Values {
  name: string;
  description: string;
  price: string;
  categoryId: string;
}

interface ImagesValue{
    image1: string;
    image2: string;
    image3: string;

}

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre del producto es requerido'),
  description: yup.string().required('La descripción del producto es requerida'),
  price: yup.string().required('El precio del producto es requerido'),
  categoryId: yup.string().required('La categoría del producto es requerida'),
});



const useUpdateProductViewModel = (productId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<ImagePicker.ImageInfo | null>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(''); // State for selected category name
  const [file1, setFile1] = useState<ImagePicker.ImageInfo>();
  const [file2, setFile2] = useState<ImagePicker.ImageInfo>();
  const [file3, setFile3] = useState<ImagePicker.ImageInfo>();
  const [images, setImages] = useState<ImagesValue>({
      image1: '',
      image2: '',
      image3: ''
  });
  const { categories } = useContext(CategoryContext);
  const { getProductById, updateProduct } = useContext(ProductContext);

  const [values, setValues] = useState<Values>({
    name: '',
    description: '',
    price: '',
    categoryId: ''
  });

  const fetchProductById = async (id: string) => {
    try {
      setLoading(true);
      setSelectedCategoryName("");
      const product = await getProductById(id);
      if (product) {
        setValues({
          name: product.data.name,
          description: product.data.description,
          price: product.data.price,
          categoryId: product.data.categoryId
        });
        
      }
    } catch (error) {
      setError("Error fetching product");
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

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
const onChangeImage = (property: string, value: any) => {
    setImages({ ...images, [property]: value });
}


  const updateProductData = async () => {
    try {
      setLoading(true);
      if (await isValidForm()) {
        const product: Product = {
          id: productId,
          name: values.name,
          description: values.description,
          price: values.price,
          categoryId: values.categoryId
        };
        const response = await updateProduct(product, file1!,file2!,file3!,productId);
        if (response.success) {
          showMessage({
            message: 'Producto actualizado',
            type: 'success',
          });
        } else {
          setError('Error al actualizar el producto');
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  const isValidForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) {
            errors[e.path] = e.message;
          }
        });
        setErrorMessages(errors);
        return false;
      }
      console.error(error);
      return false;
    }
  };

  return {
    ...images,
    ...values,
    loading,
    error,
    onChange,
    pickImage,
    takePhoto,
    categories,
    errorMessages,
    updateProduct: updateProductData,
    selectedCategoryName,
    setSelectedCategoryName,
  };
}

export default useUpdateProductViewModel;
