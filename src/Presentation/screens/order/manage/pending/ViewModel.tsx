import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";


const PendingOrdersViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [purchaseOrders, setPurchaseOrders] = useState('');
    
    const getPurchaseOrders = async () => {
        try {
            setLoading(true);

            const response = await GetPendingPurchaseOrdersUseCase(user?.session_token as string);

            if(response.success){
                setPurchaseOrders(response.data);
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
    }
}

export default PendingOrdersViewModel;