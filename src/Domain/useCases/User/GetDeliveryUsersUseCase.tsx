import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getDeliveryUsers }= new OrderRepositoryImpl();

export const GetDeliveryUsersUseCase = async (session_token: string) => {
    return await getDeliveryUsers(session_token);
}