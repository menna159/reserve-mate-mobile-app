import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { routes } from "../routes";

const HotelsPage = () => {
  const navigation = useNavigation();

  // States
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  // const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text, words = 20) => {
    if (typeof text !== "string") {
      return "";
    }
    const textArray = text.split(" ");
    if (textArray.length <= words) {
      return text;
    }
    return textArray.slice(0, words).join(" ") + "...";
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Hotels</Text>
        {hotels.map((hotel) => {
          const truncatedText = truncateText(hotel.description, 20);
          const isTruncated = hotel.description.split(" ").length > 20;

          return (
            <View key={hotel.id} style={styles.card}>
              <Image source={{ uri: hotel.image }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{hotel.name}</Text>
                <Text
                  numberOfLines={expanded[hotel.id] ? undefined : 3}
                  style={styles.cardText}
                >
                  {expanded[hotel.id] ? hotel.description : truncatedText}
                </Text>
                {isTruncated && (
                  <TouchableOpacity onPress={() => toggleReadMore(hotel.id)}>
                    <Text style={styles.readMore}>
                      {expanded[hotel.id] ? "See less" : "Read more"}
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    title="More Details"
                    color="#dfa974"
                    onPress={() =>
                      navigation.navigate("HotelDetails", { hotelId: hotel.id })
                    }
                  />
                  <Button
                    title="Reviews"
                    color="#dfa974"
                    onPress={() =>
                      navigation.navigate(routes.reviews, { hotelId: hotel.id })
                    }
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  readMore: {
    color: "#dfa974",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default HotelsPage;
