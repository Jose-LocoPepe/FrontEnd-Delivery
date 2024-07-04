import axios from 'axios';

export interface PaymentRepository {
    createPaymentIntent(amount: number): Promise<string>;
}
