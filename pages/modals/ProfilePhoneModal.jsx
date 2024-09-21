import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";

function ProfilePhoneModal({ modalTitle, currentUser }) {
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
    setValue("newPhone", "");
  };

  const handleClose = () => setShow(false);

  const updatePhone = async (data) => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        phoneNum: data.newPhone,
      });
      handleClose();
      toast.show("Phone updated successfully!", {
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
            {...register("newPhone", {
              pattern: {
                value: /^01[0-5]\d{1,8}$/,
                message:
                  "Phone number must start with '01' followed by a digit from 0 to 5!",
              },
              required: "Phone number is required!",
              maxLength: {
                value: 11,
                message: "Phone number must be 11 numbers!",
              },
              minLength: {
                value: 11,
                message: "Phone number must be 11 numbers!",
              },
            })}
            onChangeText={(value) => {
              setValue("newPhone", value);
              if (value) {
                trigger("newPhone");
              }
            }}
            placeholder="Enter new phone number"
            keyboardType="numeric"
            style={styles.input}
          />
          {errors.newPhone && (
            <Text style={styles.errorText}>{errors.newPhone.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={handleClose} color="#888" />
            <Button
              title="Update"
              onPress={handleSubmit(updatePhone)}
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

export default ProfilePhoneModal;
