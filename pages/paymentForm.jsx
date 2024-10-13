import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckOutScreen from './CheckOutScreen';
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from '@env';  // Use react-native-dotenv
import { useRoute } from '@react-navigation/native';

const PaymentForm = () => {
  const route = useRoute();
  const reserve = route.params?.reserve;
  return (
    <StripeProvider publishableKey={NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
      <CheckOutScreen storedBookingData={reserve}/>
    </StripeProvider>
  );
};

export default PaymentForm;
