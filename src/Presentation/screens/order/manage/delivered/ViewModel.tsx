import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { Order } from "../pending/ViewModel";
import { GetDeliveredPurchaseOrdersUseCase } from "../../../../../Domain/useCases/PurchaseOrder/GetDeliveredPurchaseOrdersUseCase";


const DeliveredOrdersViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [purchaseOrders, setPurchaseOrders] = useState<Order[]>([]);

    
    const getPurchaseOrders = async () => {
        try {
            setLoading(true);
            const response = await GetDeliveredPurchaseOrdersUseCase(user?.session_token as string, user?.id as string);

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

export default DeliveredOrdersViewModel;