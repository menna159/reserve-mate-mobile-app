import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";
import { updatePassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native";

function ProfilePasswordModal({ modalTitle, currentUser }) {
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
    setValue("newPassword", "");
  };

  const handleClose = () => setShow(false);

  const handleUpdatePassword = async (data) => {
    try {
      await updatePassword(currentUser, data.newPassword);
      handleClose();
      toast.show("Password updated successfully!", {
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
      <TouchableOpacity style={styles.updateBtnContainer} onPress={handleShow}>
        <Text style={styles.deleteBtn}>Update Password</Text>
      </TouchableOpacity>

      <Modal visible={show} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{modalTitle}:</Text>
          <TextInput
            {...register("newPassword", {
              required: "You must specify a password!",
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                message:
                  "Password must contain at least one number, one special character, and one uppercase character!",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters!",
              },
              maxLength: {
                value: 16,
                message: "Password must be less than 17 characters!",
              },
            })}
            onChangeText={(value) => {
              setValue("newPassword", value);
              trigger("newPassword");
            }}
            placeholder="Enter new password"
            secureTextEntry
            style={styles.input}
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={handleClose} color="#888" />
            <Button
              title="Update"
              onPress={handleSubmit(handleUpdatePassword)}
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
  updateBtnContainer: {
    backgroundColor: "#dfa974",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  deleteBtn: {
    color: "white",
    fontSize: 13,
  },
});

export default ProfilePasswordModal;
