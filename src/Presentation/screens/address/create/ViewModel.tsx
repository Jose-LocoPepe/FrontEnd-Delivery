
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

    const onChange = (property: string, value: string | number) => {
        setValues({ ...values, [property]: value });
    }

    return {
        ...values,
        errorMessages,
        loading,
        onChange
    }
}

export default AddressCreateViewModel;