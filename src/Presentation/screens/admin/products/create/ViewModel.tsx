
import { useState, Dispatch, SetStateAction } from 'react';
import { CreateProductUseCase } from '../../../../../Domain/useCases/Product/CreateProductUseCase';
import { Product } from '../../../../../Domain/entities/Product';
import * as yup from 'yup';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/api/models/ResponseAPIDelivery';
import { showMessage } from 'react-native-flash-message';
/*interface CreateProductViewModel {
    loading: boolean;
    error: string | null;
    createProduct: () => Promise<boolean>; // Define createProduct function
    newProductData: Product; // Product data to be input by the user
    setNewProductData: Dispatch<SetStateAction<Product>>; // Adjust the type here
}*/
interface Values {
    name: string;
    description: string;
    price: number;
    categoryid: number; // Assuming categoryId is a required field, you might need to adjust this
}
// Crear un nuevo producto

interface ResponseErrorData {
    path: string;
    value: string;
}
const validationCreateProductSchema = yup.object().shape({
    name: yup.string().required('El nombre del producto es requerido'),
    description: yup.string().required('La descripción del producto es requerida'),
    price: yup.number().required('El precio del producto es requerido')
});
const CreateProductViewModel = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
   
    const [errorMessages, setErrorMessages] = useState<Record<string,string>>({});
    const [errorsResponse, setErrorResponses] = useState<ResponseErrorData[]>([]);


    const [values, setValues] = useState<Values>({
        name: "",
        description: "",
        price: 0,
        categoryid: 1 // Assuming categoryId is a required field, you might need to adjust this
    }); 

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
    const createProduct = async ()=> {
        
        const isValid = await isValidForm();
        if(isValid){
            console.log('values: ' +JSON.stringify(values));
            setLoading(true);
            setErrorMessages({});
            try {
                const { ...data } = values;
                const response = await CreateProductUseCase(data);
                console.log('response: ' +JSON.stringify(response));
                
            } catch (error) {
                console.log('error: ' +JSON.stringify(error));
                const rejectErrors: ResponseAPIDelivery = error;
                if(rejectErrors.error){
                    setErrorResponses([]);
                    showMessage({
                        message: rejectErrors.message,
                        type: 'danger',
                        icon: 'danger',
                    });
                    //return false;
                } else {
                    const errorsArray = Object.values(rejectErrors.errors);
                    const errorsArrayFilter = errorsArray.map(({ msg, path }) => ({ value: msg, path }))
                    //return false;
                }
            }
        }
    }
    const isValidForm = async(): Promise<boolean> => {
        try {
            await validationCreateProductSchema.validate(values, { abortEarly: false });
            return true;
        } catch (error) {
            const errors: Record<string,string> = {};
            errors.inner.forEach((err) => {
                errors[err.path] = err.message;
            });
            setErrorMessages(errors);
            console.log(errorMessages);
            return false;
        }
    }
    return {
        ...values,
        onChange,
        createProduct,
        error,
        loading,
        errorMessages, 
        errorsResponse
    }
}
export default CreateProductViewModel;

    ///return { loading, error, createProduct, newProductData, setNewProductData };
