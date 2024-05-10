import { useContext, useState } from "react"

import * as ImagePicker from 'expo-image-picker';
import * as yup from "yup";

import { RemoveUserUseCase } from "../../../../Domain/useCases/UserLocal/RemoveUserLocal";
import { UpdateUserUseCase } from "../../../../Domain/useCases/User/UpdateUserUseCase";
import { UpdateFileUseCase } from "../../../../Domain/useCases/File/UpdateFileUseCase";
import { UserContext } from "../../../context/auth/UserContext";

interface Values {
    name: string;
    lastname: string;
    phone: string;
    imagen: string;
}

const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    lastname: yup.string().required('Los apellidos son requeridos'),
    phone: yup.string().required('El teléfono es requerido')
});

const ProfileUpdateViewModel = () => {

    const { user, updateUser: updateUserContext } = useContext(UserContext);

    const [values, setValues] = useState<Values>({
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        session_token: user.session_token,
        imagen: ''
    });
    const [file, setFile] = useState<ImagePicker.ImageInfo>();
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

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

    const updateUser = async () => {
        const validForm = isValidForm();

        if (validForm) {
            try {
                setLoading(true);

                const { image, ...data } = values;
                // Call to use case
                const response = await UpdateUserUseCase(user.id, data.name, data.lastname, data.phone, user.session_token);

                if (response.success) {
                    const dataUser = response.data;
                    dataUser.session_token = user.session_token;

                    if (file !== undefined) {
                        const responseImage = await UpdateFileUseCase(file!, 'users', dataUser.id);
                        dataUser.image = responseImage.data;
                    }
                    setLoading(false);
                    updateUserContext(dataUser);
                    return true;
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                return false;
            }
        }
    }

    const onChangeInfoUpdate = async (name: string, lastname: string, phone: string) => {
        setValues({ ...values, name, lastname, phone });
    }

    const onChange = (property: string, value: string) => {
        setValues({ ...values, [property]: value });
    }


    const isValidForm = async (): Promise<boolean> => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string, string> = {};
            error.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            console.log(errorMessages);
            return false;
        }
        return true;
    }

    return {
        ...values,
        onChange,
        onChangeInfoUpdate,
        updateUser,
        pickImage,
        takePhoto,
        errorMessages,
        loading,
        file,
        user
    }
}

export default ProfileUpdateViewModel;