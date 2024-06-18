import { useState, useContext } from "react";
import { UserContext } from "../../../context/auth/UserContext";

import * as yup from "yup";
import { CreateAddressUseCase } from "../../../../Domain/useCases/Address/CreateAddressUseCase";

interface Values {
    name: string;
    street: string;
    neighborhood: string;
    longitude: number | null;
    latitude: number | null;
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
        longitude: null,
        latitude: null
    });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [addressSelected, setAddressSelected] = useState<boolean | null>(null);

    const onChange = (property: string, value: string | number) => {
        setValues({ ...values, [property]: value });
    }

    const saveAddress = async () => {
        console.log("Entro en el saveAddress");
        if (values.latitude !== null && values.longitude !== null && addressSelected === true) {
            console.log("Entro en el if");
            const validForm = await isValidForm();
            console.log("Va a entrar en el try catch");
            if (validForm) {
                try {
                    setLoading(true);
                    const {...data} = values;

                    // Call to use case
                    const response = await CreateAddressUseCase(user?.id as string, data.name, data.street, data.neighborhood, data.longitude as number, data.latitude as number, user?.session_token as string);
                    
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
        } else {
            // The user has not selected an address

            setAddressSelected(false);
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
        saveAddress,

    }
}

export default AddressCreateViewModel;