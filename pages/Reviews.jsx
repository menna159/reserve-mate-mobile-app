import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust your import path
import { AuthContext } from "../AuthContext";
import ReviewModal from "./modals/ReviewModal"; // Adjust your import path
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";

const Reviews = ({ route }) => {
  const { hotelId } = route.params; // Get hotelId from route params
  const [hotel, setHotel] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { userDetails } = useContext(AuthContext);
  const toast = useToast();

  const fetchHotelData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "hotels", hotelId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data) {
        setHotel(data);
        setReviews(data.reviews || []);
      } else {
        setError("Hotel data not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hotel data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewName) => {
    try {
      const updatedReviews = reviews.filter(
        (review) => review.name !== reviewName
      );
      await updateDoc(doc(db, "hotels", hotelId), { reviews: updatedReviews });
      setReviews(updatedReviews);
      toast.show("Review Deleted", { type: "success" });
    } catch (err) {
      console.error("Failed to delete review:", err);
      Alert.alert("Error", "Failed to delete review.");
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const handleReviewAdded = () => {
    fetchHotelData();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.hotelContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#d6a472" />
          ) : (
            <>
              {error && <Text style={styles.errorText}>{error}</Text>}
              <Image source={{ uri: hotel.image }} style={styles.image} />
              <Text style={styles.hotelName}>{hotel.name}</Text>
              {reviews.length > 0 ? (
                reviews.map(({ name, date, rating, comment }, index) => (
                  <View
                    key={index} // Use index as the key if name is not unique
                    style={styles.reviewContainer}
                  >
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewName}>{name}</Text>
                      <View style={styles.dateDeleteContainer}>
                        <Text style={styles.reviewDate}>{date}</Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteReview(name)}
                          style={{
                            display: userDetails?.username === name ? "flex" : "none",
                          }}
                        >
                          <Icon name="trash-o" size={15} color="#900" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.ratingContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Text
                          key={star}
                          style={{
                            color: rating >= star ? "gold" : "gray",
                            fontSize: 16,
                          }}
                        >
                          ★
                        </Text>
                      ))}
                    </View>
                    <Text style={styles.reviewComment}>"{comment}"</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noReviewsText}>No Available Reviews!</Text>
              )}
              <ReviewModal
                hotelId={hotelId}
                userDetails={userDetails}
                handleReviewAdded={handleReviewAdded}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    // Removed flexGrow to ensure proper scrolling
  },
  hotelContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  hotelName: {
    fontSize: 20,
    color: "black",
    margin: 8,
  },
  reviewContainer: {
    marginBottom: 16,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewName: {
    color: "black",
    fontSize: 15,
  },
  dateDeleteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewDate: {
    color: "gray",
    fontSize: 11,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewComment: {
    color: "gray",
  },
  noReviewsText: {
    color: "#FFB22C",
  },
  errorText: {
    color: "red",
  },
});

export default Reviews;
