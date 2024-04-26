import React,  { useState, useContext, useEffect } from 'react'
import { AxiosError } from "axios"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal'
import { GetUserUseCase } from '../../../Domain/useCases/UserLocal/GetUserLocal'
import { useUserLocal } from '../../hooks/useUserLocal'
import { UserContext } from '../../context/UserContext';
const HomeViewModel = ()  => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    //const { user } = useUserLocal();
    const { user, saveUserSession } = useContext (UserContext);
    console.log('usuario:' + JSON.stringify(user));

    const suma = () => {

    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const login = async () => {
        if(isValidForm()){
            try {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('response: ' +JSON.stringify(response));

            
            if(!response.success){
                setErrorMessage('Usuario o contraseña incorrectos');
            } else {
                saveUserSession(response.data);
            }
            } catch (error) {
                console.log(error);
                setErrorMessage('Usuario o contraseña incorrectos');
            }
            
        }
    }

    const isValidForm = (): boolean => {
        if (values.email === '') {
            setErrorMessage('Ingresa el correo electronico');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        return true;
    }
    return {
        ...values,
        user,
        login,
        onChange,
        errorMessage,
    }

}

export default HomeViewModel;