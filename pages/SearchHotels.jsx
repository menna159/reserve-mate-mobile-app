import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

const SearchHotels = ({
  searchQuery,
  setSearchQuery,
  filteredHotels,
  setSelectedHotel,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Hotels..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityLabel="Search Hotels Input"
      />
      {searchQuery.length > 0 && (
        <FlatList
          data={filteredHotels}
          keyExtractor={item => item.id.toString()} // Ensure id is a string
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => setSelectedHotel(item)}
              accessibilityLabel={`Select ${item.name}`}
            >
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
      {searchQuery.length > 0 && filteredHotels.length === 0 && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdown: {
    maxHeight: 150, // Limit height to avoid overflow
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  suggestion: {
    padding: 10,
  },
  suggestionText: {
    fontSize: 16,
  },
  noResultsText: {
    padding: 10,
    color: "#888",
    fontStyle: "italic",
  },
});

export default SearchHotels;
