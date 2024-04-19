import React, { useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/useCases/Auth/RegisterAuth';
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
<<<<<<< HEAD
=======
import { Alert } from 'react-native';
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")

const RegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname:'',
        phone: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    //const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const { user, getUserSession } = useUserLocal();
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async () => {
        
        if(isValidForm()){
            const response = await RegisterAuthUseCase(values);
            console.log('response: ' +JSON.stringify(response));
            if(response.success){
                await SaveUserUseCase(response.data);
                getUserSession();
<<<<<<< HEAD
                //setErrorMessage(response.message);
            } else {
                console.log(response.message);
                //setErrorMessage(response.message);
=======
                Alert.alert('Usuario registrado');
                //setErrorMessage(''+response.message);
            } else {
                //console.log(response.message);
                setErrorMessage(''+response.message);
                Alert.alert(''+response.message);
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
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
        //pickImage,
        //takePhoto,
        errorMessage,
        loading,
        user
    }
}

export default RegisterViewModel;
