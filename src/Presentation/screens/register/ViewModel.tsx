import React, { useContext, useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/useCases/Auth/RegisterAuth';
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { Alert } from 'react-native';
import * as ImagePicker from'expo-image-picker';
import { showMessage } from "react-native-flash-message";
import { UserContext } from '../../context/auth/UserContext';
import { UpdateFileUseCase } from '../../../Domain/useCases/File/UpdateFileUseCase';
import { ResponseAPIDelivery } from '../../../Data/sources/remote/api/models/ResponseAPIDelivery';
interface Values {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    imagen: string;
}
interface ResponseErrorData {
    path: string;
    value: string;
}

const RegisterViewModel = () => {
    const { auth } = useContext(UserContext);
    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);
    const [values, setValues] = useState<Values>({
        name: '',
        lastname:'',
        phone: '',
        email: '',
        imagen: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    
    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            onChange('imagen', result.assets[0].uri);
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
                onChange('imagen', result.assets[0].uri);
                setFile(result.assets[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const register = async () => {
        const validForm = await isValidForm();
        if (validForm) {
            setLoading(true);
            try {
                const { imagen, confirmPassword, ...data } = values;

                const response = await RegisterAuthUseCase(data);

                if (response.success) {
                    console.log(response.data);
                    const responseImage = await UpdateFileUseCase(file!, 'users', response.data.id);

                    const dataUser = response.data;
                    console.log(responseImage.success);
                    
                    dataUser.imagen = responseImage.data;

                    // Save user in local storage
                    await SaveUserUseCase(dataUser);

                    // Authenticate to user
                    auth(dataUser);
                }
                setLoading(false);
            } catch (error) {
                const rejectErrors: ResponseAPIDelivery = error;

                if (rejectErrors.error) {
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message,
                        type: 'danger',
                        icon: 'danger',
                    });
                } else {
                    // Convert JSON to Array
                    const errorsArray = Object.values(rejectErrors.errors);

                    // Filter array with msg and path
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                    setErrorResponses(errorsArrayFilter);
                    console.log(error);

                }
                setLoading(false);
            }
        }
    }

  
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa tu nombre');
            console.log('Ingresa tu nombre');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Ingresa tu apellido');
            console.log('Ingresa tu apellido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('Ingresa tu correo electronico');
            console.log('Ingresa tu correo electronico');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Ingresa tu telefono');
            console.log('Ingresa tu telefono');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            console.log('Ingresa la contraseña');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('Ingresa la confirmacion de la contraseña');
            console.log('Ingresa la confirmacion de la contraseña');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            console.log('Las contraseñas no coinciden');
            return false;
        }
        return true;
    }


    return {
        ...values,
        onChange,
        register,
        pickImage,
        takePhoto,
        errorMessages,
        errorsResponse,
        loading
    }
}

export default RegisterViewModel;
