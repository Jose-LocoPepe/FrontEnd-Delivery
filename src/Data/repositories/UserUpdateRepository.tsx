import { AxiosError } from "axios";
import { UserUpdateRepository } from "../../Domain/repositories/UserUpdateRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";




export class UserUpdateRepositoryImpl implements UserUpdateRepository {
    async update(id: string, name: string, lastname: string, phone: string, session_token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `user/${id}`;
            
            const {data} = await ApiDelivery.put<ResponseAPIDelivery>(path,{name,lastname,phone},{
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            });

            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR Upd: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
}