import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { AuthContext } from "../AuthContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";  // Import navigation hook
import { db } from "../firebase";
import { Toast } from "react-native-toast-notifications";
import { routes } from "../routes";

const MyBooking = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();  // Access the navigation object

  const fetchRoomAndHotelData = async (booking) => {
    try {
      const roomDocRef = doc(db, `hotels/${booking.hotelId}/rooms/${booking.roomId}`);
      const roomDoc = await getDoc(roomDocRef);
      const hotelDocRef = doc(db, `hotels/${booking.hotelId}`);
      const hotelDoc = await getDoc(hotelDocRef);

      if (!roomDoc.exists() || !hotelDoc.exists()) {
        throw new Error("Room or Hotel data not found.");
      }

      return {
        ...booking,
        roomData: roomDoc.data(),
        hotelName: hotelDoc.data().name,
      };
    } catch (error) {
      console.error("Error fetching room or hotel data:", error);
      return null;
    }
  };

  const fetchData = async () => {
    if (currentUser) {
      try {
        const bookingsCollection = collection(db, "payments");
        const bookingsSnapshot = await getDocs(bookingsCollection);
        const data = bookingsSnapshot.docs.map(doc => {
          console.log(doc.id, doc.data());  // Log each document
          return { id: doc.id, ...doc.data() };
        });
        const userBookings = data.filter((booking) => booking.userId === currentUser.uid);
        const enrichedBookings = await Promise.all(userBookings.map(async (booking) => await fetchRoomAndHotelData(booking)));
        setBookings(enrichedBookings.filter(Boolean));
        console.log(bookings.map(booking => booking.roomData));
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const cancelOrder = async (orderId) => {
    // try {
    //   setLoading(true);
    //   const res = await fetch("/api/deleteOrder", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id: orderId }),
    //   });

    //   if (!res.ok) {
    //     throw new Error(`Failed to delete order. Server responded with status ${res.status}`);
    //   }

    //   Toast.show({
    //     text1: "Success",
    //     text2: "Reservation deleted successfully",
    //   });

    //   await fetchData();
    // } catch (err) {
    //   console.error("Error deleting order:", err.message);
    //   setError("Failed to delete order: " + err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginVertical: 20 }}>My Reservations</Text>
      <ScrollView>
        {bookings.length > 0 ? (
          bookings.map((element, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                backgroundColor: "#fff",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 3,
                overflow: "hidden",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: element.roomData.image || "/default-image.jpg" }}
                  style={{ width: 100, height: 100, resizeMode: "cover" }}
                />
                <View style={{ flex: 1, padding: 8 }}>
                  <Text style={{ fontSize: 18 }}>{element.hotelName} hotel</Text>
                  <Text>{element.roomData.title}</Text>
                  <Text>
                    Created at: <Text style={{ color: "gray" }}>{element.createdAt}</Text>
                  </Text>
                  <Text>
                    Price: <Text style={{ color: "gray" }}>{element.roomData.Price} $ per night</Text>
                  </Text>
                  <Text>
                    Size: <Text style={{ color: "gray" }}>{element.roomData.Size}</Text>
                  </Text>
                  <Text>
                    Capacity: <Text style={{ color: "gray" }}>{element.roomData.Capacity}</Text>
                  </Text>
                  <Text>
                    Bed: <Text style={{ color: "gray" }}>{element.roomData.Bed}</Text>
                  </Text>
                  <Text>
                    Services: <Text style={{ color: "gray" }}>{element.roomData.Services}</Text>
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      padding: 10,
                      borderRadius: 5,
                      alignItems: "center",
                      marginTop: 8,
                    }}
                    onPress={() => cancelOrder(element.docId)}
                  >
                    <Text style={{ color: "#fff" }}>Cancel Reservation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <Text style={{ color: "gray" }}>You haven't made any reservations.</Text>
          </View>
        )}
      </ScrollView>

      {/* Button to Navigate to Home */}
      <TouchableOpacity
        style={{
          backgroundColor: "#dfa974",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => navigation.navigate(routes.home)} // Use navigation to go to 'Home'
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyBooking;
