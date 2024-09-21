import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";

function ProfileNameModal({ modalTitle, currentUser }) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm();

  const toast = useToast();

  const handleShow = () => {
    setShow(true);
    setValue("newName", "");
  };

  const handleClose = () => setShow(false);

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const updateName = async (data) => {
    try {
      const usernameExists = await checkUsernameExists(data.newName);
      if (usernameExists) {
        toast.show(
          "Username is already taken. Please choose a different one.",
          {
            type: "danger",
          }
        );
        return;
      }
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, { username: data.newName });
      handleClose();
      toast.show("Name updated successfully!", {
        type: "success",
      });
    } catch (error) {
      toast.show(`Error: ${error.message}`, {
        type: "danger",
      });
    }
  };

  return (
    <>
      <Icon name="edit" size={20} onPress={handleShow} />

      <Modal visible={show} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{modalTitle}:</Text>
          <TextInput
            {...register("newName", {
              required: "Name is required!",
              minLength: {
                value: 3,
                message: "Name must contain 3 or more characters!",
              },
            })}
            onChangeText={(value) => {
              setValue("newName", value);
              if (value) {
                trigger("newName");
              }
            }}
            placeholder="Enter new name"
            style={styles.input}
          />
          {errors.newName && (
            <Text style={styles.errorText}>{errors.newName.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={handleClose} color="#888" />
            <Button
              title="Update"
              onPress={handleSubmit(updateName)}
              color="#dfa974"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#dfa974",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 5,
  },
});

export default ProfileNameModal;
