import { useState, Dispatch, SetStateAction } from 'react';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/Category/CreateCategoryUseCase';
import { Category } from '../../../../../Domain/entities/Category';
import * as yup from 'yup';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { showMessage } from 'react-native-flash-message';

interface Values {
    name: string;
    description: string;
}
interface ResponseErrorData {
    path: string;
    value: string;
}
const validationUpdateCategorySchema = yup.object().shape({
    name: yup.string().required('El nombre de la categoría es requerido'),
    description: yup.string().required('La descripción de la categoría es requerida')
});

const UpdateCategoryViewModel = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
   
    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);



    const [values, setValues] = useState<Values>({
        name: "",
        description: ""
    });
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const updateCategory = async () => {
        const isValid = await isValidForm();
        if(isValid){
           
        }
    };
    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationUpdateCategorySchema.validate(values, { abortEarly: false });
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
        onChange,
        loading, error, updateCategory, errorMessages, errorsResponse};
};

export default UpdateCategoryViewModel;