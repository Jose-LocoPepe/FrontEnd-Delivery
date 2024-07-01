import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";

export interface DeliveryUsersRepository {
    getDeliveryUsers(session_token: string): Promise<ResponseAPIDelivery>;
}