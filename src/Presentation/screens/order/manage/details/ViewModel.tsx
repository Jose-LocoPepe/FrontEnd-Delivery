import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";
import { GetDeliveryUsersUseCase } from "../../../../../Domain/useCases/User/GetDeliveryUsersUseCase";


const OrderDetailsViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    
    const [deliveryUsers, setDeliveryUsers] = useState([]);

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



    return {
        errorMessages,
        loading,
        getDeliveryUsers,
        deliveryUsers
    }
}

export default OrderDetailsViewModel;