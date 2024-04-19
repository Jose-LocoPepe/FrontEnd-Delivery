import { User } from "../../Domain/entities/User";
import * as ImagePicker from 'expo-image-picker';
import { ResponseAPIDelivery } from "../sources/remote/api/models/ResponseAPIDelivery";

export interface UserRepository {

    getDeliveryMen(): Promise<User[]>;
    update(user: User): Promise<ResponseAPIDelivery>;
    updateWithImage(user: User, file: ImagePicker.ImageInfo): Promise<ResponseAPIDelivery>;
    updateNotificationToken(id: string, token: string): Promise<ResponseAPIDelivery>;

}