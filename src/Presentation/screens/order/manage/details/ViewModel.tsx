import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetDeliveryUsersUseCase } from "../../../../../Domain/useCases/User/GetDeliveryUsersUseCase";
import { DispatchOrderUseCase } from "../../../../../Domain/useCases/Order/DispatchOrderUseCase";
import { GetProductsUseCase } from "../../../../../Domain/useCases/Order/GetProductsUseCase";


const OrderDetailsViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [orderId, setOrderId] = useState('');
    const [deliveryUsers, setDeliveryUsers] = useState([]);
    const [selectedDeliveryUser, setSelectedDeliveryUser] = useState('');

    const [products, setProducts] = useState([]);

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

    const dispatchOrder = async () => {
        try {
            setLoading(true);
            const response = await DispatchOrderUseCase(selectedDeliveryUser, user?.session_token as string, orderId);
            
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

    const getProducts = async () => {
        try {
            // Fetch products
            setLoading(true);
            const response = await GetProductsUseCase(user?.session_token as string, orderId);

            if(response.success){
                setProducts(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return {
        errorMessages,
        loading,
        getDeliveryUsers,
        deliveryUsers,
        selectDeliveryUser,
        dispatchOrder,
        changeOrderId,
        products,
        selectedDeliveryUser,
    }
}

export default OrderDetailsViewModel;