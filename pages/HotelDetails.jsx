import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const HotelDetails = () => {
  const route = useRoute();
  const { hotelId } = route.params;
  const navigation = useNavigation();

  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const docRef = doc(db, 'hotels', hotelId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHotel(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotelData();
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
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{hotel?.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{hotel?.location}</Text>

      <ScrollView horizontal>
        {hotel?.images?.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{ width: 200, height: 150, marginRight: 10 }}
          />
        ))}
      </ScrollView>

      <Button
        title="View Rooms" color="#dfa974" 
        onPress={() => navigation.navigate('RoomsPage', { hotelId })} // Navigate to RoomsPage with hotelId
      />

      <Text style={{ marginTop: 20, fontSize: 16 }}>✨ Facilities</Text>
      <Text>🔸 Highlights: {hotel?.Highlights?.join(', ')}</Text>

      <Text style={{ marginTop: 20 }}>🛏 Cleaning Services: {hotel?.Amenities?.['Cleaning Services']}</Text>
      <Text>🍽 Food & Drink: {hotel?.Amenities?.['Food & Drink']}</Text>

      <Text style={{ marginTop: 20, fontSize: 16 }}>🚗 Transportation</Text>
      {hotel?.Amenities?.['Transportation']?.map((amenity, index) => (
        <Text key={index}>🔸 {amenity}</Text>
      ))}

      <Text style={{ marginTop: 20 }}>🏢 Popular Amenities:</Text>
      {hotel?.Amenities?.['Popular Amenities']?.map((amenity, index) => (
        <Text key={index}>🔸 {amenity}</Text>
      ))}

      <Text style={{ marginTop: 20, fontSize: 16 }}>{hotel?.description}</Text>
    </ScrollView>
  );
};

export default HotelDetails;
