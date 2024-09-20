import { Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      left: 6,   
      right: 6, 
      height: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderTopLeftRadius: 15, 
      borderTopRightRadius: 15,
      ...Platform.select({
        android: {
          elevation: 5, 
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 0 }, 
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 0 }, 
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      }),
    },
  });