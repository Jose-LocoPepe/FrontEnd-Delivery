import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getDeliveredPurchaseOrders }= new OrderRepositoryImpl();

export const GetDeliveredPurchaseOrdersUseCase = async (session_token: string, userId:string) => {
    return await getDeliveredPurchaseOrders(session_token, userId);
}