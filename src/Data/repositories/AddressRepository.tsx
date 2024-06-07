import { AxiosError } from "axios";
import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

export class AddressRepositoryImpl implements AddressRepository {
    async createAddress(address: Address, id: string): Promise<ResponseAPIDelivery> {
        try {
            const path =  `user/${id}/address/create`
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('address/create', address);
            return Promise.resolve(data)

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR REG : ', JSON.stringify(e.response?.data));
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