export interface PurchaseOrder {
    id: number;
    date: string;
    status: string;
    totalPrice: number;
    addressId: string;
    clientId: string;
    deliveryId?: string;
}