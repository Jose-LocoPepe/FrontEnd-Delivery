import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";



export interface AddressRepository {
    getAddressById(id: string): Promise<ResponseAPIDelivery>
    createAddress(id: string, name: string, street: string, neighborhood: string, longitude: number, latitude: number, session_token: string): Promise<ResponseAPIDelivery> 
}