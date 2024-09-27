import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";

const Checkout = () => {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const bookedRoomsSnapshot = await getDocs(collection(db, 'bookings'));
        const bookedRoomsData = bookedRoomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookedRooms(bookedRoomsData);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
      }
    };
    fetchBookedRooms();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartContainer}>
        <Text style={styles.cartHeader}>Checkout</Text>
        {bookedRooms.length > 0 ? (
          bookedRooms.map((room) => (
            <View key={room.id} style={styles.cartItem}>
              <Image
                source={{ uri: room.image }}
                style={styles.roomImage}
                resizeMode="cover"
              />
              <View style={styles.roomDetails}>
                <Text style={styles.roomTitle}>{room.Title}</Text>
                <Text style={styles.roomPrice}>
                  {room.Price}$ <Text style={styles.perNight}>/Pernight</Text>
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No rooms booked yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

 

 

// Styling
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  cardStyle: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
  },
  cardField: {
    height: 50,
    marginVertical: 20,
  },
});

export default Checkout;
