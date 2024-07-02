import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { deliverOrder } = new OrderRepositoryImpl();

export const DeliverOrderUseCase = async (deliveryUserId: string, session_token: string, orderId: string) => {
    return await deliverOrder(deliveryUserId, session_token, orderId);
}