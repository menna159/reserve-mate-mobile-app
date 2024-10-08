import React, { useState } from "react";
import { View, Text, TextInput, Button,  Alert, ScrollView, SafeAreaView, Pressable } from "react-native";
import styles from "../Contact-us/ContactUs.module";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    Alert.alert("Form submitted!", `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          We'd love to hear from you! If you have any questions, feedback, or need assistance, please don't hesitate to reach out.
        </Text>
        <View style={styles.contactInfoList}>
          <Text style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Email: </Text>
            olivermichel88@gmail.com
          </Text>
          <Text style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Phone: </Text>
            +20 100 221 7494
          </Text>
          <Text style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Address: </Text>
            1234 Booking St., Suite 100, City, State, ZIP
          </Text>
        </View>
        <Text style={styles.sectionText}>Thank you for choosing Reserve-Mate. We look forward to serving you!</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Get In Touch</Text>

        <View style={styles.formGroup}>
          <Text style={styles.formGroupLabel}>Name</Text>
          <TextInput
            style={styles.formGroupInput}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            placeholder="Enter your name"
            required
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formGroupLabel}>Email</Text>
          <TextInput
            style={styles.formGroupInput}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            required
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formGroupLabel}>Message</Text>
          <TextInput
            style={[styles.formGroupInput, styles.textarea]}
            value={formData.message}
            onChangeText={(value) => handleInputChange("message", value)}
            placeholder="Enter your message"
            multiline
            required
          />
        </View>
        <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable> 
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsPage;
