import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    contactInfo: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#dfa974",
      textAlign:"center"
    },
    sectionText: {
      fontSize: 16,
      marginBottom: 20,
      color: "#333",
    },
    contactInfoList: {
      marginBottom: 20,
    },
    contactInfoItem: {
      fontSize: 16,
      marginBottom: 5,
    },
    contactInfoLabel: {
      fontWeight: "bold",
      color: "#333",
    },
    formContainer: {
      marginBottom: 20,
    },
    formGroup: {
      marginBottom: 20,
    },
    formGroupLabel: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#333",
    },
    formGroupInput: {
      borderColor: "lightgray",
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
    },
    textarea: {
      height: 100,
      textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#dfa974",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        elevation: 5, // For Android shadow effect
        shadowColor: "#000", // For iOS shadow effect
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow effect
        shadowOpacity: 0.3, // For iOS shadow effect
        shadowRadius: 3, // For iOS shadow effect
      },
      buttonPressed: {
        opacity: 0.8, 
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign:"center"
      },
      buttonContainer: {
        marginVertical: 20,
        alignItems: "center",
        marginBottom:50
      },
  });
  export default styles;