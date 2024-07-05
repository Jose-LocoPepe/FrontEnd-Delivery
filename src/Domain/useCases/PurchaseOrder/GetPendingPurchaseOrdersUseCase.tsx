import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getPendingPurchaseOrders }= new OrderRepositoryImpl();

export const GetPendingPurchaseOrdersUseCase = async (session_token: string, userId:string) => {
    return await getPendingPurchaseOrders(session_token, userId);
}