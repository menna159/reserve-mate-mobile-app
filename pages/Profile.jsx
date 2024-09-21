import React, { useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../AuthContext";
import ProfileNameModal from "./modals/ProfileNameModal";
import ProfilePhoneModal from "./modals/ProfilePhoneModal";
import ProfileEmailModal from "./modals/ProfileEmailModal";
import ProfilePasswordModal from "./modals/ProfilePasswordModal";
import ProfileDeleteModal from "./modals/ProfileDeleteModal";
// import AuthGuard from "@/app/components/main-app/ui/auth-guard/AuthGuard";  // Adjust path as necessary

const Profile = () => {
  const { currentUser, userDetails, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dfa974" />
      </View>
    );
  }

  //   if (!currentUser) {
  //     return <AuthGuard />;
  //   }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Basic Info:</Text>
      {[
        {
          label: "Name",
          value: userDetails?.username,
          Modal: ProfileNameModal,
        },
        {
          label: "Email",
          value: userDetails?.userEmail,
          Modal: ProfileEmailModal,
        },
        {
          label: "Phone",
          value: userDetails?.phoneNum,
          Modal: ProfilePhoneModal,
        },
      ].map(({ label, value, Modal }) => (
        <View style={styles.row} key={label}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
          <Modal modalTitle={`New ${label}`} currentUser={currentUser} />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <ProfilePasswordModal
          modalTitle="New Password"
          currentUser={currentUser}
        />
        <ProfileDeleteModal
          modalTitle="Delete Account"
          currentUser={currentUser}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: "auto",
    width: "90%",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dfa974",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#dfa974",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default Profile;
