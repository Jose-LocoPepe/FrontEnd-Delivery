import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { startDelivery } = new OrderRepositoryImpl();

export const StartDeliveryUseCase = async (session_token: string, orderId: string) => {
    return await startDelivery(session_token, orderId);
}