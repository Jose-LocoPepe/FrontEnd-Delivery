import { DeliveryUsersRepositoryImpl } from "../../../Data/repositories/DeliveryUsersRepository";

const { getDeliveryUsers }= new DeliveryUsersRepositoryImpl();

export const GetDeliveryUsersUseCase = async (session_token: string) => {
    return await getDeliveryUsers(session_token);
}