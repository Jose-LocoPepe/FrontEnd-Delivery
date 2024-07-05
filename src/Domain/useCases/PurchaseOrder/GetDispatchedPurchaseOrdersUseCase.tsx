import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getDispatchedPurchaseOrders }= new OrderRepositoryImpl();

export const GetDispatchedPurchaseOrdersUseCase = async (session_token: string, userId:string) => {
    return await getDispatchedPurchaseOrders(session_token, userId);
}