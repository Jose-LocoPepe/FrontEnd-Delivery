import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetDeliveryUsersUseCase } from "../../../../../Domain/useCases/User/GetDeliveryUsersUseCase";
import { DispatchOrderUseCase } from "../../../../../Domain/useCases/Order/DispatchOrderUseCase";
import { GetProductsUseCase } from "../../../../../Domain/useCases/Order/GetProductsUseCase";
import { DeliverOrderUseCase } from "../../../../../Domain/useCases/Order/DeliverOrderUseCase";
import { StartDeliveryUseCase } from "../../../../../Domain/useCases/Order/StartDeliveryUseCase";

import * as Location from "expo-location"

interface Product {
    id: number;
    name: string;
    quantity: number;
    images: { image: string }[];
}


const OrderDetailsViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [orderId, setOrderId] = useState('');
    const [deliveryUsers, setDeliveryUsers] = useState([]);
    const [selectedDeliveryUser, setSelectedDeliveryUser] = useState('');

    const [products, setProducts] = useState<Product[]>([]);
    // const [productos,setProductos] = useState([]);

    const getDeliveryUsers = async () => {
        try {
            const response = await GetDeliveryUsersUseCase(user?.session_token as string);
            
            if(response.success){
                setDeliveryUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const selectDeliveryUser = (userId: string) => {
        setSelectedDeliveryUser(userId);
    }

    const changeOrderId = (orderId: string) => {
        setOrderId(orderId);
    }

    const dispatchOrder = async (orderId: string, deliveryUserId: string) => {
        console.log('selectedDeliveryUser: ', selectedDeliveryUser);
        try {
            setLoading(true);
            const response = await DispatchOrderUseCase(deliveryUserId, user?.session_token as string, orderId);
            
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

    const getProducts = async ( id: string) => {
        try {
            setLoading(true);
            const response = await GetProductsUseCase(user?.session_token as string, id);
            
            if(response.success){
                const data = response.data;
                const transformedProducts = data.map((product: Product) => ({
                    ...product,
                    images: product.images.length > 0 ? [{ image: product.images[0].image }] : [{ image: 'default.jpg' }],
                }));

                setProducts(transformedProducts);
                // setProductos(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const deliverOrder = async (orderId: string) => {
        try {
            setLoading(true);
            const response = await DeliverOrderUseCase(user?.session_token as string, orderId);
            
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

    const startDelivery = async (orderId: string) => {
        try {
            setLoading(true);
            const response = await StartDeliveryUseCase(user?.session_token as string, orderId);
            
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
        user,
        errorMessages,
        loading,
        getDeliveryUsers,
        deliveryUsers,
        selectDeliveryUser,
        dispatchOrder,
        changeOrderId,
        products,
        selectedDeliveryUser,
        getProducts,
        deliverOrder,
        startDelivery,
        requestPermissions
    }
}

export default OrderDetailsViewModel;