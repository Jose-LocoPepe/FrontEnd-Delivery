
import * as yup from "yup";

import { useState, useContext } from "react";
import { UserContext } from "../../../context/auth/UserContext";

interface Values {
    name: string;
    street: string;
    neighborhood: string;
    longitude: number;
    latitude: number;
}

const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    street: yup.string().required('La calle es requerida'),
    neighborhood: yup.string().required('La colonia es requerida'),
    longitude: yup.number().required('La longitud es requerida'),
    latitude: yup.number().required('La latitud es requerida')
});

const AddressCreateViewModel = () => {
    const { user } = useContext(UserContext);
    const [values, setValues] = useState<Values>({
        name: '',
        street: '',
        neighborhood: '',
        longitude: 0,
        latitude: 0
    });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [addressSelected, setAddressSelected] = useState(false);

    const onChange = (property: string, value: string | number) => {
        setValues({ ...values, [property]: value });
    }

    const saveAddress = async () => {
        const validForm = await isValidForm();

        if (validForm) {
            try {
                setLoading(true);
                const {...data} = values;

                // Call to use case
                const response = await ;

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
        errorMessages,
        loading,
        onChange,
        addressSelected,
        setAddressSelected,
        saveAddress
    }
}

export default AddressCreateViewModel;