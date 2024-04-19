<<<<<<< HEAD
import React,  { useState, useContext } from 'react'
import { AxiosError } from "axios"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"

=======
import React,  { useState, useContext, useEffect } from 'react'
import { AxiosError } from "axios"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery"
import { LoginAuthUseCase } from "../../../Domain/useCases/Auth/LoginAuth"
import { SaveUserUseCase } from '../../../Domain/useCases/UserLocal/SaveUserLocal'
import { GetUserUseCase } from '../../../Domain/useCases/UserLocal/GetUserLocal'
import { useUserLocal } from '../../hooks/useUserLocal'
import { UserContext } from '../../context/UserContext';
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
const LoginViewModel = ()  => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

<<<<<<< HEAD
=======
    //const { user } = useUserLocal();
    const { user, saveUserSession } = useContext (UserContext);
    //console.log('usuario:' + JSON.stringify(user));

>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
    const suma = () => {

    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value });
    }

    const login = async () => {
        if(isValidForm()){
<<<<<<< HEAD
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('response: ' +JSON.stringify(response));
            if(!response.success){
                
                //setErrorMessage(response.message);
            }
        }
        
    }

      const isValidForm = (): boolean => {
=======
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
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        if (values.email === '') {
            setErrorMessage('Ingresa el correo electronico');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
<<<<<<< HEAD

=======
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        return true;
    }
    return {
        ...values,
<<<<<<< HEAD
=======
        user,
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        login,
        onChange,
        errorMessage,
    }

}

export default LoginViewModel;