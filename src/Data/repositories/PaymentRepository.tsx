import axios from 'axios';

export class PaymentRepository {
    async createPaymentIntent(amount: number): Promise<string> {
        const response = await axios.post('http://your-server-url/create-payment-intent', { amount });
        return response.data.clientSecret;
    }
}
