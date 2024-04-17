import React,  { useState, useContext } from 'react'
import { AxiosError } from "axios"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"

const LoginViewModel = ()  => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const suma = () => {

    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const login = async () => {
        if(isValidForm()){
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('response: ' +JSON.stringify(response));
            if(!response.success){
                
                //setErrorMessage(response.message);
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
        login,
        onChange,
        errorMessage,
    }

}

export default LoginViewModel;