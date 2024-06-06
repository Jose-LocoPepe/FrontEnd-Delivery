import { useState, useEffect, useContext } from 'react';
import { Category } from '../../../../../Domain/entities/Category';
import * as yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { CategoryContext } from '../../../../context/categories/CategoryContext';
import { UserContext } from '../../../../context/auth/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { ValidationError } from 'yup';

interface Values {
  name: string;
  description: string;
  image: string;
}
interface ResponseErrorData {
  path: string;
  value: string;
}

const validationUpdateCategorySchema = yup.object().shape({
  name: yup.string().required('El nombre de la categoría es requerido'),
  description: yup.string().required('La descripción de la categoría es requerida'),
  image: yup.string().required('La imagen de la categoría es requerida')
});

const EditCategoryViewModel = (categoryId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<ImagePicker.ImageInfo>();
  
  const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
  const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

  const { getCategoryById, updateCategory } = useContext(CategoryContext);
  const { user } = useContext(UserContext);

  const [values, setValues] = useState<Values>({
    name: '',
    description: '',
    image: '',
  });

  const fetchCategoryById = async (id: string) => {
    try {
      setLoading(true);
      const category = await getCategoryById(id);
      if (category) {
        setValues({
          name: category.data.name,
          description: category.data.description,
          image: category.data.image,
        });
      }
    } catch (error) {
      setError("Error fetching category");
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });

      if (!result.canceled) {
        onChange('image', result.assets[0].uri);
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoryData = async () => {
    try {
      setLoading(true);
      if (await isValidForm()) {
        const category: Category = {
          name: values.name,
          description: values.description,
          image: values.image,
        };
        const response = await updateCategory(category,file!,categoryId);
        if (response.success) {
          showMessage({
            message: 'Categoría actualizada',
            type: 'success',
          });
        } else {
          setError('Error al actualizar la categoría');
        }
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error al actualizar la categoría');
    } finally {
      setLoading(false);
    }
  }
  

  const isValidForm = async (): Promise<boolean> => {
    try {
      await validationUpdateCategorySchema.validate(values, { abortEarly: false });
      return true;
    } catch (error: any) { // Specify the type of error as ValidationError
      const errors: Record<string, string> = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) { // Ensure e.path is defined before using it as an index
            errors[e.path] = e.message;
          }
        });
        setErrorMessages(errors);
        return false;
      }
      // Handle other types of errors if needed
      console.error(error);
      return false;
    }
  };

  return {
    ...values,
    loading,
    error,
    onChange,
    pickImage,
    takePhoto,
    errorMessages,
    updateCategory: updateCategoryData,
    fetchCategoryById
  };
};

export default EditCategoryViewModel;
