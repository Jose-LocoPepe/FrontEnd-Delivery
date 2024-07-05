// PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {
  const { amount } = route.params;
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Fetch client secret from backend
      const response = await axios.post('https://your-backend.com/api/payment/create-payment-intent', { amount });

      const { clientSecret } = response.data;

      // Confirm payment with Stripe
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        console.log('Payment successful', paymentIntent);
        // Handle successful payment here
      }
    } catch (error) {
      console.error('Payment failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
        style={{ width: '90%', height: 50, marginVertical: 30 }}
      />
      <Button title="Pay" onPress={handlePayment} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default PaymentScreen;
