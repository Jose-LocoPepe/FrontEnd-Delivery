import { useState, useContext } from "react";
import { UserContext } from "../../../../context/auth/UserContext";


const OrderDetailsViewModel = () => {
    const { user } = useContext(UserContext);
    
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    

    const getDeliveryUsers = async () => {
        // Call the API to get the list of delivery users
        try {
            // Call to use case
            // const response = await GetDeliveryUsersUseCase(user?.id as string, user?.session_token as string);
            
            // if(response.success){
            //     return response.data;
            // }
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }



    return {
        errorMessages,
        loading,
    }
}

export default OrderDetailsViewModel;