import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase"; // Import your Firestore configuration

const MyBooking = () => {
  const [bookings, setBookings] = useState([]); // State for storing booking data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch booking data from Firestore
    const fetchBookings = async () => {
      try {
        const bookingsSnapshot = await getDocs(collection(db, 'bookings')); // Adjust 'bookings' to your collection name
        const bookingsData = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scrollWrapper}> {/* Wrapping View to control height and overflow */}
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={true} // Show scroll indicator in web
        >
          <Text style={styles.cartHeader}>My Booking</Text>
          {bookings.length > 0 ? (
            bookings.map((room, index) => (
              <View key={index} style={styles.cartItem}>
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
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noItemsText}>No rooms added to the cart yet.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center', // Center the scroll wrapper for web
    justifyContent: 'center',
  },
  scrollWrapper: {
    width: '100%', // Full width
    height: '80vh', // Occupy 80% of the viewport height for web
    maxWidth: 600, // Optional: Set a max-width for better readability
    overflow: Platform.OS === 'web' ? 'auto' : 'hidden', // Enable scroll for web
  },
  scrollView: {
    flex: 1, // Full height for ScrollView
  },
  scrollContent: {
    padding: 20, // Adjust padding inside ScrollView
  },
  cartHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ebebeb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  roomImage: {
    width: '100%',
    height: 200,
  },
  roomDetails: {
    padding: 24,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
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
  noItemsText: {
    fontSize: 16,
    color: '#707079',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyBooking;
