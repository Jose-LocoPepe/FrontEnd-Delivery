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
const validationCreateCategorySchema = yup.object().shape({
    name: yup.string().required('El nombre de la categoría es requerido'),
    description: yup.string().required('La descripción de la categoría es requerida')
});

const CreateCategoryViewModel = () => {
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

    const createCategory = async () => {
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
    };
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
        onChange,
        loading, error, createCategory, errorMessages, errorsResponse};
};

export default CreateCategoryViewModel;