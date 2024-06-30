import { useState, useContext } from "react";
import { UserContext } from "../../../context/auth/UserContext";

import * as yup from "yup";
import { CreateAddressUseCase } from "../../../../Domain/useCases/Address/CreateAddressUseCase";

import * as Location from "expo-location"

interface Values {
    name: string;
    street: string;
    neighborhood: string;
}

const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    street: yup.string().required('La calle es requerida'),
    neighborhood: yup.string().required('La colonia es requerida')
});

const AddressCreateViewModel = () => {
    const { user } = useContext(UserContext);
    const [values, setValues] = useState<Values>({
        name: '',
        street: '',
        neighborhood: ''
    });
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [addressSelected, setAddressSelected] = useState<boolean | null>(null);

    
    const onChange = (property: string, value: string | number | null) => {
        setValues({ ...values, [property]: value });
    }

    const saveAddress = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            try {
                setLoading(true);
                const {...data} = values;

                // Call to use case
                const response = await CreateAddressUseCase(user?.id as string, data.name, data.street, data.neighborhood, longitude as number, latitude as number, user?.session_token as string);
                
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
            if(!checkCoordinates()){
                return false;
            }
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

    //change the coordinates
    const changeCoordinates = (newLatitude: number, newLongitude: number) => {
        setLatitude(newLatitude);
        setLongitude(newLongitude);
        setAddressSelected(true);
    }

    //validate coordinates
    const checkCoordinates = () => {
        if(latitude && longitude){
            return true;
        }
        setAddressSelected(false);
        return false;
    }

    const requestPermissions = async (): Promise<boolean> => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            return false ;
        }else{
            return true;
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
        changeCoordinates,
        requestPermissions
    }
}

export default AddressCreateViewModel;