import React, { createContext, useContext } from 'react';
import { Stripe } from 'stripe-client'; // Replace with your Stripe library import

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const processPayment = async ({ cardNumber, expiryDate, cvc, amount }) => {
    try {
      // Replace with actual Stripe payment processing logic
      const stripe = Stripe('your-publishable-key');
      const token = await stripe.createToken({
        number: cardNumber,
        exp_month: expiryDate.split('/')[0],
        exp_year: expiryDate.split('/')[1],
        cvc: cvc,
      });

      // Process payment with backend API
      const response = await fetch('/your-backend-api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, message: 'Payment failed' };
    }
  };

  return (
    <PaymentContext.Provider value={{ processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
