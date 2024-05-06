import { ResponseVerifyTokenAPIDelivery } from '../../Data/sources/remote/api/models/ResponseVerifyTokenApiDelivery';
import { User } from '../entities/User';

export interface UserLocalRepository {
    save(user: User): Promise<void>;
    getUser(): Promise<User>;
    removeItem(): Promise<void>;
    verifyToken(token: string): Promise<ResponseVerifyTokenAPIDelivery>;
}