import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { routes } from "../../routes";

function ProfileDeleteModal({ modalTitle, currentUser }) {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteAccount = async () => {
    if (!currentUser) {
      toast.show("No user found.", {
        type: "danger",
      });
      return;
    }
    try {
      await currentUser.delete();
      await deleteDoc(doc(db, "users", currentUser.uid));

      handleClose();
      toast.show("Account deleted successfully!", {
        type: "success",
      });
      navigation.navigate(routes.signup);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        toast.show("Re-log in to be able to delete your account!", {
          type: "danger",
        });
        return;
      }
      toast.show(error.message, {
        type: "danger",
      });
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.deleteBtnContainer} onPress={handleShow}>
        <Text style={styles.deleteBtn}>Delete Account</Text>
      </TouchableOpacity>
      <Modal
        visible={show}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}:</Text>
            <Text style={styles.modalBody}>Are you sure?</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.btn}>
                <Button title="No" onPress={handleClose} color="#888" />
              </View>
              <View style={styles.btn}>
                <Button title="Yes" onPress={handleDeleteAccount} color="red" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  modalBody: {
    marginVertical: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  deleteBtn: {
    color: "white",
    fontSize: 13,
  },
  deleteBtnContainer: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
  },
  btn: {
    width: 50,
  },
});

export default ProfileDeleteModal;
