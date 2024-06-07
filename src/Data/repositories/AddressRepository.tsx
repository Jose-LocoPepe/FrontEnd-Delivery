import { AxiosError } from "axios";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

export class AddressRepositoryImpl implements AddressRepository {
    async createAddress(id: string, name: string, street: string, neighborhood: string, longitude: number, latitude: number, session_token: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `user/${id}/address/create`

            const {data} = await ApiDelivery.post<ResponseAPIDelivery>(path,{name,street,neighborhood,longitude,latitude},{
                headers: {
                    'Authorization': `Bearer ${session_token}`
                }
            });
            return Promise.resolve(data)
        } catch (error) {
            let e = (error as AxiosError);
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
    async getAddressById(id: string): Promise<ResponseAPIDelivery> {
        try {
            const path = `user/${id}/address/get`;
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>(path);
            return Promise.resolve(data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR GET: ', JSON.stringify(e.response?.data));
            const apiError: ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.reject(apiError)
        }
    }
    
}