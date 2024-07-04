import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { deliverOrder } = new OrderRepositoryImpl();

export const DeliverOrderUseCase = async (session_token: string, orderId: string) => {
    return await deliverOrder(session_token, orderId);
}