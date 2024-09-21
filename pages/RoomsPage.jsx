import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";

const RoomsPage = () => {
  const route = useRoute();
  const { hotelId } = route.params;

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <Text>Size: {room.Size}</Text>
          <Text>Capacity: {room.Capacity}</Text>
          <Text>Bed: {room.Bed}</Text>
          <Text>Services: {room.Services}</Text>

          {/* Commenting out the booking part */}
          {/* 
          <Button
            title="Book Now"
            onPress={() => handleBooking(room.id)} 
          />
          */}
        </View>
      ))}
    </ScrollView>
  );
};

export default RoomsPage;
