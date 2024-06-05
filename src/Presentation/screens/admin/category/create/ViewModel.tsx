import { useState, Dispatch, SetStateAction, useContext } from 'react';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/Category/CreateCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';
import * as yup from 'yup';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { showMessage } from 'react-native-flash-message';
import { CategoryContext } from '../../../../context/categories/CategoryContext';
import { UserContext } from '../../../../context/auth/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { UpdateFileUseCase } from '../../../../../Domain/useCases/File/UpdateFileUseCase';


interface Values {
    name: string;
    description: string;
    image: string;
}
interface ResponseErrorData {
    path: string;
    value: string;
}
const validationCreateCategorySchema = yup.object().shape({
    name: yup.string().required('El nombre de la categoría es requerido'),
    description: yup.string().required('La descripción de la categoría es requerida'),
    image: yup.string().required('La imagen de la categoría es requerida')
});

const CreateCategoryViewModel = () => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<ImagePicker.ImageInfo>();
   
    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const { createCategory } = useContext(CategoryContext);

    const { user } = useContext(UserContext);

    const [values, setValues] = useState<Values>({
        name:'',
        description: '',
        image: '',
    });
    const onChange = (property: string, value: any) => {
        
        setValues({ ...values, [property]: value });

    }   
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        console.log('result: ' +JSON.stringify(result));

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
        }
    }

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
    }
    const create = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            try {
                setLoading(true);

                // Clean field to category
                const { image, ...data } = values;

                // Call the category context to create the category
                const response = await createCategory(data, file!);
                if (response.success) {

                
                    setLoading(false);
                    showMessage({
                        message: 'Categoría creada',
                        description: 'La categoría se ha creado correctamente',
                        type: 'success',
                    });
                    setValues({
                        name: '',
                        description: '',
                        image: '',
                    });
                


                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        setLoading(false);
    }/*

    const create = async () => {
        const isValid = await isValidForm();
        if(isValid){
            console.log('values: ' +JSON.stringify(values));
            setLoading(true);
            setErrorMessages({});
            try {
                setLoading(true);
                const {...data} = values;
                const response = await CreateCategoryUseCase(data);
                setLoading(false);
                return true;
            } catch (error) {
                console.log('error: ' +JSON.stringify(error));
                const rejectErrors: ResponseAPIDelivery = error;
                if(rejectErrors.error){
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message,
                        type: 'danger',
                        icon: 'danger',
                    });
                    //return false;
                } else {
                    const errorsArray = Object.values(rejectErrors.errors);
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                    //return false;
                }
            }
        }
    };*/
    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationCreateCategorySchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors = {};
            error.inner.forEach((e) => {
                errors[e.path] = e.message;
            });
            setErrorMessages(errors);
            return false;
        }
    }

    return { 
        ...values,
        pickImage,
        takePhoto,
        onChange,
        loading, error, create, errorMessages, errorsResponse};
};

export default CreateCategoryViewModel;