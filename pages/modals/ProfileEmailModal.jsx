import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function ProfileEmailModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Icon name="edit" size={20} onPress={handleShow} />

      <Modal visible={show} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalBody}>
            Email address cannot be changed for security reasons.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={handleClose} color="#888" />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalBody: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProfileEmailModal;
