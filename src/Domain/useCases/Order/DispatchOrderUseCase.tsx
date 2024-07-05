import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { dispatchOrder } = new OrderRepositoryImpl();

export const DispatchOrderUseCase = async (deliveryUserId: string, session_token: string, orderId: string) => {
    return await dispatchOrder(deliveryUserId, session_token, orderId);
}