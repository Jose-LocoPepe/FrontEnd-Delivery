import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetPendingPurchaseOrdersUseCase } from "../../../../../Domain/useCases/PurchaseOrder/GetPendingPurchaseOrdersUseCase";

export interface DeliveryUser {
    name: string;
    lastName: string;
}
export interface Order {
    id: number;
    date: string;
    status: string;
    totalPrice: number;
    addressId: number;
    clientId: number;
    deliveryUserId?: string | null;
    client: {
      name: string;
      lastName: string;
      phone: string;
    };
    address: {
      street: string;
    };
    deliveryUser?:  DeliveryUser | null;
  }

const PendingOrdersViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [purchaseOrders, setPurchaseOrders] = useState<Order[]>([]);

    
    const getPurchaseOrders = async () => {
        try {
            setLoading(true);
            const response = await GetPendingPurchaseOrdersUseCase(user?.session_token as string, user?.id as string);

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

export default PendingOrdersViewModel;