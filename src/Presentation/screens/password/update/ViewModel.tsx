import { useContext, useState } from "react"
import { UserContext } from "../../../context/auth/UserContext";

import * as yup from "yup";
import { ChangePasswordUseCase } from "../../../../Domain/useCases/User/ChangePasswordUseCase";



interface Values {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}


const validationSchema = yup.object().shape({
    currentPassword: yup.string().required('La contraseña actual es requerida'),
    newPassword: yup.string().required('La nueva contraseña es requerida'),
    
    confirmNewPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es requerida')
});



const PasswordUpdateViewModel = () => {
    const { user } = useContext(UserContext);
    const [values, setValues] = useState<Values>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    

    const updatePassword = async () => {
        const validForm = await isValidForm();

        if (validForm) {
            try {
                setLoading(true);
                const {confirmNewPassword, ...data} = values;

                // Call to use case
                const response = await ChangePasswordUseCase(user?.id as string, data.currentPassword, data.newPassword,user?.session_token as string);

                if(response.success){
                    setLoading(false);
                    return true;
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                return false;
            }
        }
    }

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }


    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};

            if(error instanceof yup.ValidationError){
                error.inner.forEach((err: yup.ValidationError) => {
                    errors[err.path as string] = err.message;
                });
                setErrorMessages(errors);
            }
            console.log(errorMessages);
            return false;
        }
    }



    return {
        ...values,
        onChange,
        updatePassword,
        errorMessages,
        loading
        
    }
}

export default PasswordUpdateViewModel;