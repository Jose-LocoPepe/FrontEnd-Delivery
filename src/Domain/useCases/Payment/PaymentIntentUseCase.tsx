import { PaymentRepository } from '../../../Data/repositories/PaymentRepository';

const { createPaymentIntent } = new PaymentRepository();

export const CreatePaymentIntentUseCase = async (amount: number) => {
    return await createPaymentIntent(amount);
}