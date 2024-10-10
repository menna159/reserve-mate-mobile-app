// // Import necessary libraries and Firebase functions
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
// import { collection, addDoc } from 'firebase/firestore';
// import {db} from '../firebase';
// import { useNavigation } from '@react-navigation/native';

// const CheckOutScreen = () => {
//   const { confirmPayment } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [cardDetails, setCardDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [bookingData, setBookingData] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Assuming you get booking data from AsyncStorage or navigation params
//     const storedBookingData = {/* Get data from AsyncStorage or other sources */};
//     setBookingData(storedBookingData);
//   }, []);

//   const handlePayment = async () => {
//     if (!cardDetails?.complete) {
//       Alert.alert('Incomplete card details');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create a payment intent directly with Stripe
//       const response = await fetch('https://api.stripe.com/v1/payment_intents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` // Use your secret key here
//         },
//         body: new URLSearchParams({
//           amount: String(bookingData.roomPrice * 100), // in cents
//           currency: 'usd',
//           payment_method_types: ['card']
//         })
//       });

//       const { client_secret: clientSecret, id: sessionId } = await response.json();

//       // Confirm the payment on the client side using Stripe SDK
//       const { error, paymentIntent } = await confirmPayment(clientSecret, {
//         type: 'Card',
//         billingDetails: { /* Optional billing details */ },
//       });

//       if (error) {
//         setError(error.message);
//       } else if (paymentIntent.status === 'Succeeded') {
//         await storeBookingDataToFirestore(sessionId);
//         Alert.alert('Payment successful');
//         navigation.navigate('BookingConfirmation'); // Navigate after payment success
//       }

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const storeBookingDataToFirestore = async (sessionId) => {
//     try {
//       const bookingRef = collection(db, `hotels/${bookingData.hotelId}/rooms/${bookingData.roomId}/bookings`);
//       const paymentRef = collection(db, 'payments');

//       // Store booking data
//       await addDoc(bookingRef, {
//         ...bookingData,
//         status: 'confirmed',
//         createdAt: new Date().toISOString(),
//       });

//       // Store payment data
//       await addDoc(paymentRef, {
//         roomId: bookingData.roomId,
//         hotelId: bookingData.hotelId,
//         userId: bookingData.userId,
//         sessionId: sessionId,
//         roomPrice: bookingData.roomPrice,
//         createdAt: new Date().toISOString(),
//       });

//     } catch (err) {
//       console.error('Failed to store booking data: ', err.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 22, marginBottom: 20 }}>Payment Information</Text>

//       <CardField
//         postalCodeEnabled={true}
//         placeholders={{ number: '4242 4242 4242 4242' }}
//         cardStyle={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}
//         style={{ height: 50, marginVertical: 30 }}
//         onCardChange={cardDetails => setCardDetails(cardDetails)}
//       />

//       {error && <Text style={{ color: 'red' }}>{error}</Text>}

//       <Button
//         title={loading ? 'Processing...' : 'Confirm Payment'}
//         onPress={handlePayment}
//         disabled={loading}
//       />
//       {loading && <ActivityIndicator size="large" />}
//     </View>
//   );
// };

// export default CheckOutScreen;
