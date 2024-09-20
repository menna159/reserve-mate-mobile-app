import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export default function Home({ navigation }) { 
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Hotels"
        onPress={() => navigation.navigate('HotelsPage')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
