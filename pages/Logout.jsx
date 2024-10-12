import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Toast, useToast } from "react-native-toast-notifications";
import { routes } from "../routes";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

  async function signOutUser() {
    setLoading(true);
    try {
      await signOut(auth);
      toast.show("Logged out successfully!", {
        type: "success",
      });
      navigation.navigate(routes.login);
    } catch (error) {
      Toast.show("Logout failed. Please try again.", {
        type: "danger",
      });
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={signOutUser}
        disabled={loading}
        style={styles.btnContainer}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btn}>Log Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  btnContainer: {
    backgroundColor: "#A04747",
    borderRadius: 5,
    padding: 10,
    marginTop: 166,
  },
});

export default Logout;
