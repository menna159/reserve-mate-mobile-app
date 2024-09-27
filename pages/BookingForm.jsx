import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const BookingModal = () => {
  const navigation = useNavigation();

  // States
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [hotelsOptions, setHotelsOptions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isArrivalDate, setIsArrivalDate] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsRef = collection(db, "hotels");
        const q = query(hotelsRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const allHotels = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setHotelsOptions(allHotels);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
      }
    };

    fetchHotels();
  }, []);

  const handleInputChange = (field, value) => {
    if (field === "numberOfAdults" || field === "numberOfChildren") {
      value = Math.max(0, parseInt(value) || 0);
    }
    if (field === "numberOfNights") {
      setNumberOfNights(value);
    } else if (field === "numberOfAdults") {
      setNumberOfAdults(value);
    } else if (field === "numberOfChildren") {
      setNumberOfChildren(value);
    }
  };

  const openCalendar = isArrival => {
    setIsArrivalDate(isArrival);
    setIsCalendarVisible(true);
  };

  const onDayPress = day => {
    if (isArrivalDate) {
      setArrivalDate(day.dateString);
      setDepartureDate("");
    } else {
      const checkInDate = new Date(arrivalDate);
      const checkOutDate = new Date(day.dateString);

      if (checkOutDate <= checkInDate) {
        Alert.alert("Error", "Check-out date must be after check-in date.");
        return;
      }

      setDepartureDate(day.dateString);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(nights > 0 ? nights : 1);
    }

    setIsCalendarVisible(false);
  };

  const handleReserve = () => {
    if (!arrivalDate || !departureDate) {
      Alert.alert("Error", "Please select both check-in and check-out dates.");
      return;
    }

    navigation.navigate("RoomsPage", {
      hotelId: selectedHotel,
      numberOfNights,
      numberOfPersons: numberOfAdults + numberOfChildren,
      arrivalDate: moment(arrivalDate).format("DD-MM-YYYY"),
      departureDate: moment(departureDate).format("DD-MM-YYYY"),
    });
  };

  return (
    <View style={styles.bookingContainer}>
      <Text>Select Hotel:</Text>
      <Picker
        selectedValue={selectedHotel}
        onValueChange={itemValue => setSelectedHotel(itemValue)}
      >
        {hotelsOptions.map(hotel => (
          <Picker.Item key={hotel.id} label={hotel.name} value={hotel.id} />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={() => openCalendar(true)}
        style={styles.inputContainer}
      >
        <Text>Check-In Date: {arrivalDate || "Select Date"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openCalendar(false)}
        style={styles.inputContainer}
      >
        <Text>Check-Out Date: {departureDate || "Select Date"}</Text>
      </TouchableOpacity>

      {isCalendarVisible && (
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [arrivalDate]: { selected: true, marked: true },
            [departureDate]: { selected: true, marked: true },
          }}
          minDate={new Date().toISOString().split("T")[0]}
          enableSwipeMonths={true}
          style={styles.calendar}
        />
      )}

      <Text style={styles.label}>Number of Adults:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfAdults.toString()}
        onChangeText={value => handleInputChange("numberOfAdults", value)}
      />

      <Text style={styles.label}>Number of Children:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfChildren.toString()}
        onChangeText={value => handleInputChange("numberOfChildren", value)}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Booking Summary:</Text>
        <Text>Check-In Date: {arrivalDate}</Text>
        <Text>Check-Out Date: {departureDate}</Text>
        <Text>Number of Nights: {numberOfNights}</Text>
        <Text>Number of Adults: {numberOfAdults}</Text>
        <Text>Number of Children: {numberOfChildren}</Text>
        <Text>
          Total Number of Persons: {numberOfAdults + numberOfChildren}
        </Text>
      </View>

      <Button
        style={styles.button}
        title="Reserve Now"
        onPress={handleReserve}
        disabled={!selectedHotel || numberOfNights < 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  inputContainer: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: "center",
    paddingLeft: 10,
  },
  calendar: {
    marginBottom: 20,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 8,
  },
  summaryText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#dfa974",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});

export default BookingModal;
