import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase";

const ScrollableComponent = Platform.OS === 'web' ? 'div' : 'ScrollView';

const RoomsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();  
  const { hotelId, userId } = route.params;

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

  const handleBooking = async (room) => {
    try {
      
      await setDoc(doc(db, `users/${userId}/bookings`, room.id), {
        Title: room.Title,
        Price: room.Price,
        Size: room.Size,
        Capacity: room.Capacity,
        Bed: room.Bed,
        Services: room.Services,
        Image: room.image,
      });
      navigation.navigate('MyBooking');  
    } catch (error) {
      console.error("Error booking room: ", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  return (
    <ScrollableComponent style={styles.scrollContainer}>
      <Text style={styles.headerText}>Our Rooms</Text>
      {rooms.map((room) => (
        <View key={room.id} style={styles.roomItem}>
          <Image
            source={{ uri: room.image }}
            style={styles.roomImage}
            resizeMode="cover"
          />
          <View style={styles.roomText}>
            <Text style={styles.roomTitle}>{room.Title}</Text>
            <Text style={styles.roomPrice}>{room.Price}$ <Text style={styles.perNight}>/Pernight</Text></Text>
            <View style={styles.roomDetailsContainer}>
              <Text style={styles.roomDetailLabel}>Size:</Text>
              <Text style={styles.roomDetail}>{room.Size}</Text>
            </View>
            <View style={styles.roomDetailsContainer}>
              <Text style={styles.roomDetailLabel}>Capacity:</Text>
              <Text style={styles.roomDetail}>{room.Capacity}</Text>
            </View>
            <View style={styles.roomDetailsContainer}>
              <Text style={styles.roomDetailLabel}>Bed:</Text>
              <Text style={styles.roomDetail}>{room.Bed}</Text>
            </View>
            <View style={styles.roomDetailsContainer}>
              <Text style={styles.roomDetailLabel}>Services:</Text>
              <Text style={styles.roomDetail}>{room.Services}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => handleBooking(room)}  // Updated to handle booking using Firestore
            >
              <Text style={styles.bookNowText}>Booking Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollableComponent>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',   
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    height: '100vh',  
    overflowY: 'auto', 
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  roomItem: {
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ebebeb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  roomImage: {
    width: '100%',
    height: 200, 
  },
  roomText: {
    padding: 24,
    borderColor: '#ebebeb',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#19191a',
    marginBottom: 17,
  },
  roomPrice: {
    fontSize: 20,
    color: '#dfa974',
    fontWeight: '900',
    marginBottom: 10,
  },
  perNight: {
    fontSize: 14,
    fontWeight: '400',
    color: '#19191a',
  },
  roomDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  roomDetailLabel: {
    width: 125,
    fontSize: 18,
    color: '#707079',
    lineHeight: 36,
  },
  roomDetail: {
    fontSize: 16,
    color: '#707079',
    lineHeight: 30,
  },
  bookNowButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#dfa974',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 50,
  },
  bookNowText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default RoomsPage;
