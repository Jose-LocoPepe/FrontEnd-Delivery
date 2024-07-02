import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetOnTheWayPurchaseOrdersUseCase } from "../../../../../Domain/useCases/PurchaseOrder/GetOnTheWayPurchaseOrdersUseCase";
import { Order } from "../pending/ViewModel";


const OnTheWayOrdersViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [purchaseOrders, setPurchaseOrders] = useState<Order[]>([]);

    
    const getPurchaseOrders = async () => {
        try {
            setLoading(true);
            const response = await GetOnTheWayPurchaseOrdersUseCase(user?.session_token as string, user?.id as string);

            if(response.success){
                setPurchaseOrders(response.data);
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
        getPurchaseOrders,
        purchaseOrders,
    }
}

export default OnTheWayOrdersViewModel;