import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetDeliveryUsersUseCase } from "../../../../../Domain/useCases/User/GetDeliveryUsersUseCase";
import { DispatchOrderUseCase } from "../../../../../Domain/useCases/Order/DispatchOrderUseCase";
import { GetProductsUseCase } from "../../../../../Domain/useCases/Order/GetProductsUseCase";


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

    const getProducts = async ( orderId: string) => {
        try {
            setLoading(true);
            const response = await GetProductsUseCase(user?.session_token as string, orderId);

            if(response.success){
                const transformedProducts: Product[] = response.data.map((product: Product) => ({
                    ...product,
                    images: product.images.length > 0 ? [{ image: product.images[0].image }] : [{ image: 'default.jpg' }],
                }));

                setProducts(transformedProducts);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
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
    }
}

export default OrderDetailsViewModel;