import { AxiosError } from "axios";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

export class OrderRepositoryImpl implements OrderRepository {
    async getDeliveryUsers(session_token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `user/delivery`;

            const {data} = await ApiDelivery.get<ResponseAPIDelivery>(path,{
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            });

            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }

    async dispatchOrder(deliveryUserId: string, session_token: string, orderId: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `order/${orderId}/dispatch`;

            const {data} = await ApiDelivery.post<ResponseAPIDelivery>(path,{
                deliveryUserId
            },{
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            });

            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
}