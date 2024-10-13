import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Button, Modal, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Added AsyncStorage


const RoomsPage = () => {

  const route = useRoute();
  const { hotelId } = route.params;
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    arrivalDate: "",
    departureDate: "",
    numberOfPersons: 1,
    numberOfChildren: 0,
  });
  
  const navigation = useNavigation(); // Added navigation

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsSnapshot = await getDocs(collection(db, `hotels/${hotelId}/rooms`));
        const roomsData = roomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleBooking = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalVisible(true);
  };

  const handleBookingSubmit = async () => {
    if (!bookingDetails.arrivalDate || !bookingDetails.departureDate) {
      Alert.alert("Error", "Please provide both arrival and departure dates.");
      return;
    }

    const arrivalDate = new Date(bookingDetails.arrivalDate);
    const departureDate = new Date(bookingDetails.departureDate);

    // Validate date inputs
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for today

    if (arrivalDate < today) {
      Alert.alert("Error", "Arrival date cannot be in the past.");
      return;
    }

    if (departureDate <= arrivalDate) {
      Alert.alert("Error", "Departure date must be after arrival date.");
      return;
    }

    try {
      // Fetch existing bookings for the selected room
      const bookingsSnapshot = await getDocs(collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`));
      const existingBookings = bookingsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        arrivalDate: new Date(doc.data().arrivalDate),
        departureDate: new Date(doc.data().departureDate),
      }));

      // Check for date conflicts
      const isAvailable = existingBookings.every((booking) => {
        return (
          departureDate <= booking.arrivalDate ||
          arrivalDate >= booking.departureDate
        );
      });

      if (!isAvailable) {
        Alert.alert("Error", "The selected room is already booked for the chosen dates.");
        return;
      }

      // Proceed with booking if the room is available
      const bookingData = {
        ...bookingDetails,
        roomId: selectedRoomId,
        hotelId,
        roomPrice: rooms.find(room => room.id === selectedRoomId).Price,
      };

      await addDoc(collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`), {
        arrivalDate: bookingDetails.arrivalDate,
        departureDate: bookingDetails.departureDate,
        numberOfPersons: bookingDetails.numberOfPersons,
        numberOfChildren: bookingDetails.numberOfChildren,
      });

      // Store booking data in AsyncStorage (or you could pass it directly through navigation params)
      await AsyncStorage.setItem('bookingData', JSON.stringify(bookingData));

      // Redirect to checkout page
      navigation.navigate('paymentForm',{reserve:bookingData}); // Ensure this screen is registered in your navigation

      setIsModalVisible(false);
      Alert.alert("Success", "Booking confirmed!");

    } catch (error) {
      console.error("Error booking room:", error);
      Alert.alert("Error", "Failed to confirm booking.");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Our Rooms</Text>
      {rooms.map((room) => (
        <View key={room.id} style={{ marginVertical: 10 }}>
          <Image
            source={{ uri: room.image }}
            style={{ width: '100%', height: 150 }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{room.Title}</Text>
          <Text style={{ fontSize: 16 }}>Price: {room.Price}$ per night</Text>
          <Button
            title="Book Now"
            onPress={() => handleBooking(room.id)}
          />
        </View>
      ))}

      {/* Booking Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Book Room</Text>

            <Text>Arrival Date:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              placeholder="YYYY-MM-DD"
              value={bookingDetails.arrivalDate}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, arrivalDate: text })}
            />

            <Text>Departure Date:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              placeholder="YYYY-MM-DD"
              value={bookingDetails.departureDate}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, departureDate: text })}
            />

            <Text>Number of Adults:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              keyboardType="numeric"
              value={bookingDetails.numberOfPersons.toString()}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfPersons: parseInt(text) })}
            />

            <Text>Number of Children:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              keyboardType="numeric"
              value={bookingDetails.numberOfChildren.toString()}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfChildren: parseInt(text) })}
            />

            <Button title="Confirm Booking" onPress={handleBookingSubmit} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default RoomsPage;
