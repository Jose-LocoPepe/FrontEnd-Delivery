import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";
import { Address } from "../entities/Address";


export interface AddressRepository {
    getAddressById(id: string): Promise<ResponseAPIDelivery>
    createAddress(address: Address, id: string): Promise<ResponseAPIDelivery> 

    
}