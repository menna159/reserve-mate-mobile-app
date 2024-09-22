import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.hotelName}>{hotel?.name}</Text>
     

      <ScrollView horizontal>
        {hotel?.images?.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.hotelImage}
          />
        ))}
      </ScrollView>

      <Text style={styles.hotelLocation}>{hotel?.location}</Text>

      <TouchableOpacity
        style={styles.viewRoomsButton}
        onPress={() => navigation.navigate('RoomsPage', { hotelId })}>
        <Text style={styles.buttonText}>View Rooms</Text>
      </TouchableOpacity>

      <Text style={styles.Header}>✨ Facilities</Text>

      <Text style={styles.sectionHeader}>🔸 Highlights: {hotel?.Highlights?.join(', ')}</Text>
      <Text style={{ marginTop: 20 }}>🛏 Cleaning Services: {hotel?.Amenities?.['Cleaning Services']}</Text>
      <Text>🍽 Food & Drink: {hotel?.Amenities?.['Food & Drink']}</Text>

      <Text style={styles.sectionHeader}>🚗 Transportation</Text>
      {hotel?.Amenities?.['Transportation']?.map((amenity, index) => (
        <Text key={index}>🔸 {amenity}</Text>
      ))}

      <Text style={styles.sectionHeader}>🏢 Popular Amenities:</Text>
      {hotel?.Amenities?.['Popular Amenities']?.map((amenity, index) => (
        <Text key={index}>🔸 {amenity}</Text>
      ))}

      <Text style={styles.description}>{hotel?.description}</Text>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');  

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',   
    marginBottom: 18,
  },
  hotelLocation: {
    fontSize: 18,
    textAlign: 'center',   
    marginBottom: 10,
    marginTop: 15,
  },
  hotelImage: {
    width: 200,
    height: 190,
    marginRight: 10,
  },
  viewRoomsButton: {
    alignSelf: 'flex-end',  
    width: width * 0.25,       
    marginTop: 10,            
    backgroundColor: '#dfa974', 
    paddingVertical: 10,       
    borderRadius: 5,           
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  Header:{
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },

  sectionHeader: {
    marginTop: 15,
    fontSize: 20,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
  },
};

export default HotelDetails;
