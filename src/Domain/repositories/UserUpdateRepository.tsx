import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";

export interface UserUpdateRepository{
    update(id: string, name: string, lastname: string, phone: string, session_token: string): Promise<ResponseAPIDelivery>
}