import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getOnTheWayPurchaseOrders }= new OrderRepositoryImpl();

export const GetOnTheWayPurchaseOrdersUseCase = async (session_token: string, userId:string) => {
    return await getOnTheWayPurchaseOrders(session_token, userId);
}