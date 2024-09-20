import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../../firebase"; // Adjust your import path
import { doc, getDoc, updateDoc } from "firebase/firestore";
import StarRating from "./StarRating"; // Adjust your import path
import { useToast } from "react-native-toast-notifications";

function ReviewModal({ hotelId, userDetails, handleReviewAdded }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const toast = useToast();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const addReview = async () => {
    if (!userDetails) {
      Alert.alert("Error", "You must be logged in to leave a review.");
      return;
    }

    try {
      const docRef = doc(db, "hotels", hotelId);
      const hotelSnapshot = await getDoc(docRef);
      const existingReviews = hotelSnapshot.data()?.reviews || [];

      const existingReviewIndex = existingReviews.findIndex(
        (review) => review.name === userDetails.username
      );

      if (existingReviewIndex !== -1) {
        existingReviews[existingReviewIndex] = {
          ...existingReviews[existingReviewIndex],
          comment: userReview,
          rating: rating,
          date: formattedDate,
        };
      } else {
        existingReviews.push({
          name: userDetails.username,
          comment: userReview,
          rating: rating,
          date: formattedDate,
        });
      }

      await updateDoc(docRef, { reviews: existingReviews });

      handleReviewAdded();
      resetForm();
      toast.show("Review Submitted Successfully!", { type: "success" });
    } catch (error) {
      console.error(error.message);
      toast.show("Something went wrong while submitting your review.", {
        type: "error",
      });
    }
  };

  const resetForm = () => {
    setShow(false);
    setUserReview(""); // Clear the review input
    setRating(0); // Reset the rating
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setShow(true)}
          disabled={!userDetails}
          style={{
            width: "auto",
            backgroundColor: "#dfa974",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Leave a Review
          </Text>
        </TouchableOpacity>
        {!userDetails && (
          <Text style={{ color: "red", marginLeft: 10 }}>
            You must be logged in to leave a review.
          </Text>
        )}
      </View>

      <Modal
        visible={show}
        animationType="slide"
        onRequestClose={resetForm} // Reset form on close
      >
        <View style={{ padding: 20, backgroundColor: "#ccc", flex: 1 }}>
          <Text style={{ color: "black", fontSize: 15 }}>Your Rating:</Text>
          <StarRating rating={rating} setRating={setRating} />
          {rating === 0 && (
            <Text style={{ color: "red" }}>Rating is required!</Text>
          )}

          <Text style={{ color: "black", marginTop: 10, fontSize: 15 }}>
            Your Thoughts:
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            value={userReview}
            onChangeText={setUserReview}
            style={{
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              color: "white",
              backgroundColor: "#333",
            }}
            placeholder="Write your review..."
            placeholderTextColor="gray"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button title="Close" onPress={resetForm} color="#6c757d" />
            <Button
              color="#dfa974"
              title="Send Review"
              onPress={addReview}
              disabled={rating === 0 || userReview.trim() === ""}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default ReviewModal;
