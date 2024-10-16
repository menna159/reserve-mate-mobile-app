// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, ActivityIndicator, Button, Modal, Alert, TextInput } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native'; // Added useNavigation
// import { collection, getDocs, addDoc } from 'firebase/firestore';
// import { db } from "../firebase";
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Added AsyncStorage


// const RoomsPage = () => {

//   const route = useRoute();
//   const { hotelId } = route.params;
//   const [rooms, setRooms] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRoomId, setSelectedRoomId] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState({
//     arrivalDate: "",
//     departureDate: "",
//     numberOfPersons: 1,
//     numberOfChildren: 0,
//   });
  
//   const navigation = useNavigation(); // Added navigation

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const roomsSnapshot = await getDocs(collection(db, `hotels/${hotelId}/rooms`));
//         const roomsData = roomsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setRooms(roomsData);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRooms();
//   }, [hotelId]);

//   const handleBooking = (roomId) => {
//     setSelectedRoomId(roomId);
//     setIsModalVisible(true);
//   };

//   const handleBookingSubmit = async () => {
//     if (!bookingDetails.arrivalDate || !bookingDetails.departureDate) {
//       Alert.alert("Error", "Please provide both arrival and departure dates.");
//       return;
//     }

//     const arrivalDate = new Date(bookingDetails.arrivalDate);
//     const departureDate = new Date(bookingDetails.departureDate);

//     // Validate date inputs
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Reset time for today

//     if (arrivalDate < today) {
//       Alert.alert("Error", "Arrival date cannot be in the past.");
//       return;
//     }

//     if (departureDate <= arrivalDate) {
//       Alert.alert("Error", "Departure date must be after arrival date.");
//       return;
//     }

//     try {
//       // Fetch existing bookings for the selected room
//       const bookingsSnapshot = await getDocs(collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`));
//       const existingBookings = bookingsSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         arrivalDate: new Date(doc.data().arrivalDate),
//         departureDate: new Date(doc.data().departureDate),
//       }));

//       // Check for date conflicts
//       const isAvailable = existingBookings.every((booking) => {
//         return (
//           departureDate <= booking.arrivalDate ||
//           arrivalDate >= booking.departureDate
//         );
//       });

//       if (!isAvailable) {
//         Alert.alert("Error", "The selected room is already booked for the chosen dates.");
//         return;
//       }

//       // Proceed with booking if the room is available
//       const bookingData = {
//         ...bookingDetails,
//         roomId: selectedRoomId,
//         hotelId,
//         roomPrice: rooms.find(room => room.id === selectedRoomId).Price,
//       };

//       await addDoc(collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`), {
//         arrivalDate: bookingDetails.arrivalDate,
//         departureDate: bookingDetails.departureDate,
//         numberOfPersons: bookingDetails.numberOfPersons,
//         numberOfChildren: bookingDetails.numberOfChildren,
//       });

//       // Store booking data in AsyncStorage (or you could pass it directly through navigation params)
//       await AsyncStorage.setItem('bookingData', JSON.stringify(bookingData));

//       // Redirect to checkout page
//       navigation.navigate('paymentForm',{reserve:bookingData}); // Ensure this screen is registered in your navigation

//       setIsModalVisible(false);
//       Alert.alert("Success", "Booking confirmed!");

//     } catch (error) {
//       console.error("Error booking room:", error);
//       Alert.alert("Error", "Failed to confirm booking.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#dfa974" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Our Rooms</Text>
//       {rooms.map((room) => (
//         <View key={room.id} style={{ marginVertical: 10 }}>
//           <Image
//             source={{ uri: room.image }}
//             style={{ width: '100%', height: 150 }}
//           />
//           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{room.Title}</Text>
//           <Text style={{ fontSize: 16 }}>Price: {room.Price}$ per night</Text>
//           <Button
//             title="Book Now"
//             onPress={() => handleBooking(room.id)}
//           />
//         </View>
//       ))}

//       {/* Booking Modal */}
//       <Modal
//         visible={isModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Book Room</Text>

//             <Text>Arrival Date:</Text>
//             <TextInput
//               style={{ borderBottomWidth: 1, marginBottom: 10 }}
//               placeholder="YYYY-MM-DD"
//               value={bookingDetails.arrivalDate}
//               onChangeText={(text) => setBookingDetails({ ...bookingDetails, arrivalDate: text })}
//             />

//             <Text>Departure Date:</Text>
//             <TextInput
//               style={{ borderBottomWidth: 1, marginBottom: 10 }}
//               placeholder="YYYY-MM-DD"
//               value={bookingDetails.departureDate}
//               onChangeText={(text) => setBookingDetails({ ...bookingDetails, departureDate: text })}
//             />

//             <Text>Number of Adults:</Text>
//             <TextInput
//               style={{ borderBottomWidth: 1, marginBottom: 10 }}
//               keyboardType="numeric"
//               value={bookingDetails.numberOfPersons.toString()}
//               onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfPersons: parseInt(text) })}
//             />

//             <Text>Number of Children:</Text>
//             <TextInput
//               style={{ borderBottomWidth: 1, marginBottom: 10 }}
//               keyboardType="numeric"
//               value={bookingDetails.numberOfChildren.toString()}
//               onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfChildren: parseInt(text) })}
//             />

//             <Button title="Confirm Booking" onPress={handleBookingSubmit} />
//             <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default RoomsPage;





import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, ActivityIndicator, Modal, Alert, TextInput, 
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const navigation = useNavigation();

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // if (arrivalDate < today || departureDate <= arrivalDate) {
    //   Alert.alert("Error", "Invalid date selection.");
    //   return;
    // }


     if (arrivalDate < today) {
      Alert.alert("Error", "Arrival date cannot be in the past.");
      return;
    }

    if (departureDate <= arrivalDate) {
      Alert.alert("Error", "Departure date must be after arrival date.");
      return;
    }

    try {
      const bookingsSnapshot = await getDocs(
        collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`)
      );
      const existingBookings = bookingsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        arrivalDate: new Date(doc.data().arrivalDate),
        departureDate: new Date(doc.data().departureDate),
      }));

      const isAvailable = existingBookings.every((booking) =>
        departureDate <= booking.arrivalDate || arrivalDate >= booking.departureDate
      );

      if (!isAvailable) {
        Alert.alert("Error", "Room is already booked for the selected dates.");
        return;
      }

      const bookingData = {
        ...bookingDetails,
        roomId: selectedRoomId,
        hotelId,
        roomPrice: rooms.find((room) => room.id === selectedRoomId).Price,
      };

      await addDoc(
        collection(db, `hotels/${hotelId}/rooms/${selectedRoomId}/bookings`),
        bookingData
      );

      await AsyncStorage.setItem('bookingData', JSON.stringify(bookingData));
      navigation.navigate('paymentForm', { reserve: bookingData });

      setIsModalVisible(false);
      Alert.alert("Success", "Booking confirmed!");
    } catch (error) {
      console.error("Error booking room:", error);
      Alert.alert("Error", "Failed to confirm booking.");
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerText}>Our Rooms</Text>
      {rooms.map((room) => (
        <View key={room.id} style={styles.roomItem}>
          <Image source={{ uri: room.image }} style={styles.roomImage} resizeMode="cover" />
          <View style={styles.roomText}>
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

            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => handleBooking(room.id)}
            >
              <Text style={styles.bookNowText}>Booking Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.roomTitle}>Book Room</Text>

            <Text>Arrival Date:</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={bookingDetails.arrivalDate}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, arrivalDate: text })}
            />

            <Text>Departure Date:</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={bookingDetails.departureDate}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, departureDate: text })}
            />

            <Text>Number of Adults:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={bookingDetails.numberOfPersons.toString()}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfPersons: parseInt(text) })}
            />

            <Text>Number of Children:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={bookingDetails.numberOfChildren.toString()}
              onChangeText={(text) => setBookingDetails({ ...bookingDetails, numberOfChildren: parseInt(text) })}
            />

            <TouchableOpacity onPress={handleBookingSubmit} style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Confirm Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
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
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ebebeb',
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  roomDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  roomDetailLabel: {
    width: 125,
    fontSize: 18,
    color: '#707079',
  },
  roomDetail: {
    fontSize: 16,
    color: '#707079',
  },
  bookNowButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#dfa974',
    borderRadius: 4,
    alignItems: 'center',
  },
  bookNowText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default RoomsPage;

