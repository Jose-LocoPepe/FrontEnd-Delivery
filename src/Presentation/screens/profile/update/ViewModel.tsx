import { useContext, useState } from 'react'
import { UserContext } from '../../../../Presentation/context/UserContext'

import * as ImagePicker from 'expo-image-picker';

interface Values{
    name: string;
    lastname: string;
    phone: string;
    image: string;
}



const ProfileUpdateViewModel = () => {

    const { user } = useContext (UserContext);

    const [values, setValues] = useState<Values>({
        name: '',
        lastname: '',
        phone: '',
        image: ''
    });

    //const [file, setFile] = useState<ImagePicker.ImageInfo>()
    const [errorMessage, setErrorMessage] = useState('');


    
    const updateUser = async () => {
        if(isValidForm()){
            try {
                // Call to use case
            } catch (error) {
                
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
        if (values.phone === '') {
            setErrorMessage('Ingresa tu telefono');
            console.log('Ingresa tu telefono');
            return false;
        }
        return true;
    }




    return {
        user
    }
}

export default ProfileUpdateViewModel;