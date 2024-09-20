import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

function StarRating({ rating, setRating }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => setRating(star)}>
            <Text
              style={{
                fontSize: 24, // Adjust size as needed
                color: rating >= star ? "gold" : "gray",
                marginHorizontal: 2, // Space between stars
              }}
            >
              ★
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default StarRating;
