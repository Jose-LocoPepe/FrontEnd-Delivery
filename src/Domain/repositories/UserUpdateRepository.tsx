import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";

export interface UserUpdateRepository {
    update(id: string, name: string, lastName: string, phone: string, session_token: string): Promise<ResponseAPIDelivery>;
    changePassword(id: string, currentPassword: string, newPassword: string, session_token: string): Promise<ResponseAPIDelivery>;
}