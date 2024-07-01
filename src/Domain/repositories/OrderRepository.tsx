import { ResponseAPIDelivery } from "../../Data/sources/remote/api/models/ResponseAPIDelivery";

export interface OrderRepository {
    getDeliveryUsers(session_token: string): Promise<ResponseAPIDelivery>;
    dispatchOrder(deliveryUserId: string, session_token: string, orderId: string): Promise<ResponseAPIDelivery>;
    getProducts(session_token: string, orderId: string): Promise<ResponseAPIDelivery>;
    getPendingPurchaseOrders(session_token: string, userId: string): Promise<ResponseAPIDelivery>;
    getDispatchedPurchaseOrders(session_token: string, userId: string): Promise<ResponseAPIDelivery>;
    getDeliveredPurchaseOrders(session_token: string, userId: string): Promise<ResponseAPIDelivery>;
    getOnTheWayPurchaseOrders(session_token: string, userId: string): Promise<ResponseAPIDelivery>;
}