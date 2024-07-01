import { AxiosError } from "axios";
import { DeliveryUsersRepository } from "../../Domain/repositories/DeliveryUsersRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

export class DeliveryUsersRepositoryImpl implements DeliveryUsersRepository {
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
}