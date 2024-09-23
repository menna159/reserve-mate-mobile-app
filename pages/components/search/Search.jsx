 
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a hotel..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    color:"#dfa974",
    fontSize:20,
    fontWeight:'bold',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
