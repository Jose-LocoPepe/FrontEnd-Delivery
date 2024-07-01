import { OrderRepositoryImpl } from "../../../Data/repositories/OrderRepository";

const { getProducts } = new OrderRepositoryImpl();

export const GetProductsUseCase = async (session_token: string, orderId: string) => {
    return await getProducts(session_token, orderId);
}