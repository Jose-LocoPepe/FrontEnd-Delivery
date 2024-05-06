import { useState, useContext, useEffect } from 'react'
import * as yup from 'yup'
import { Error, ResponseAPIDelivery } from "../../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"
import { showMessage } from "react-native-flash-message";
import { UserContext } from '../../context/auth/UserContext'
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal';
interface Values {
    email: string;
    password: string;
}
interface ResponseErrorData {
    path: string;
    value: string;
}
const validationLoginSchrema = yup.object().shape({
    email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
    password: yup.string().required('La contraseña es requerida'),
});

const HomeViewModel = ()  => {
    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);

    const [values, setValues] = useState<Values>({
        email: "",
        password: ""
    });

    const { auth } = useContext (UserContext);

    const suma = () => {

    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const login = async () => {

        const isValid = await isValidForm();
        if(isValid){
            setErrorMessages({});
            try {
                const response = await LoginAuthUseCase(values.email, values.password);
                console.log('response: ' +JSON.stringify(response));
                if(response.success){
                    await SaveUserUseCase(response.data);
                    auth(response.data);
                }
            } catch (error:any) {
                const rejectErrors: ResponseAPIDelivery = error;
                if (rejectErrors.error) {
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message ?? "",
                        type: 'danger',
                        icon: 'danger',
                    });
                } else {
                    
                        // Convert JSON to Array
                        const errorsArray = Object.values(rejectErrors.errors);

                        // Filter array with msg and path
                        const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                        setErrorResponses(errorsArrayFilter);

                }
            }
            
        }
    }

    const isValidForm = async(): Promise<boolean> => {
        try {
            await validationLoginSchrema.validate(values, { abortEarly: false });
            return true;
        } catch (error:any) {
            const errors: Record<string,string> = {};
            error.inner.forEach((err:any) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(error);
            console.log(errorMessages);
            return false;
        }
    }
    return {
        ...values,
        login,
        onChange,
        errorMessages,
        errorsResponse
    }
}

export default HomeViewModel;