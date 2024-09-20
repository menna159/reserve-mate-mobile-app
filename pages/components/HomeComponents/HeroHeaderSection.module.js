import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      height: 400, 
    },
    slide: {
      width: Dimensions.get("window").width,
      height: 400,
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    caption: {
      position: "absolute",
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 15,
      borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: "#fff",
      textAlign: "center",
    },
  
  });