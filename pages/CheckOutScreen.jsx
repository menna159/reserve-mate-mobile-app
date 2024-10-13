import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../routes';
import { AuthContext } from '../AuthContext';

const CheckOutScreen = ({ storedBookingData }) => {
  const { currentUser } = useContext(AuthContext);
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser && storedBookingData) {
      setBookingData({ ...storedBookingData, userId: currentUser?.uid });
    }
  }, [currentUser, storedBookingData]);

  const handlePayment = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    if (!cardDetails?.complete) {
      Alert.alert('Incomplete card details');
      return;
    }

    setLoading(true);
    setError(null); // Clear previous error messages

    try {
      const response = await fetch('http://192.168.1.48:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bookingData.roomPrice * 100, // Amount in cents
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const { clientSecret, sessionId } = await response.json();

      // Confirm the payment with the client secret
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        setError(error.message);
      } else if (paymentIntent?.status === 'Succeeded') {
        await storeBookingDataToFirestore(sessionId);
        Alert.alert('Payment successful', '', [
          {
            text: 'OK',
            onPress: () => navigation.navigate(routes.myBooking),
          },
        ]);
      }

    } catch (err) {
      console.error('Payment error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const storeBookingDataToFirestore = async (sessionId) => {
    try {
      console.log("Storing booking data...");
      const bookingRef = collection(db, `hotels/${bookingData.hotelId}/rooms/${bookingData.roomId}/bookings`);
      const paymentRef = collection(db, 'payments');
  
      console.log("Booking Reference:", bookingRef);
      console.log("Payment Reference:", paymentRef);
  
      await addDoc(bookingRef, {
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      });
      console.log("Booking data stored successfully");
      const getCurrentDateTime = () => {
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const localTime = new Date(now.getTime() - timezoneOffset);
        return localTime.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'
      };
      await addDoc(paymentRef, {
        roomId: bookingData.roomId,
        hotelId: bookingData.hotelId,
        userId: bookingData.userId,
        sessionId,
        roomPrice: bookingData.roomPrice,
        createdAt: getCurrentDateTime(),
      });
      console.log("Payment data stored successfully");
  
    } catch (err) {
      console.error("Failed to store booking data: ", err.message);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Payment Information</Text>

      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
        style={{ height: 50, marginVertical: 30 }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <Button
        title={loading ? 'Processing...' : 'Confirm Payment'}
        onPress={handlePayment}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default CheckOutScreen;
