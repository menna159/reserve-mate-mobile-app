import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AboutUsSection from '../about-us-section/AboutUsSection';
import styles from './AboutUs.module';
const AboutUsPage = () => {
  return (
    <ScrollView style={styles.container}>
      <AboutUsSection />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to Reserve-Mate</Text>
        <Text style={styles.sectionText}>
          At Reserve-Mate, we are dedicated to simplifying the reservation
          process for both businesses and customers. Our platform is designed
          to streamline bookings, making it easier and more efficient for
          everyone involved.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          Our mission is to provide a seamless and user-friendly booking
          experience. We aim to connect people with the services they need in
          the most convenient way possible, ensuring a hassle-free experience
          from start to finish.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Do</Text>
        <Text style={styles.sectionText}>
          Reserve-Mate offers a comprehensive booking solution for a variety of
          industries, including:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>Hospitality</Text>: Easily book hotel rooms, resorts, and vacation rentals.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>Restaurants</Text>: Reserve tables at your favorite dining spots.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>Events</Text>: Secure tickets for concerts, conferences, and other events.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>Services</Text>: Schedule appointments for salons, spas, and other personal services.
          </Text>
        </View>
        <Text style={styles.sectionText}>
          Our platform provides an intuitive interface for both users and
          service providers, ensuring smooth communication and efficient
          management of reservations.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Reserve-Mate?</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>User-Friendly Interface</Text>: Our platform is designed with simplicity in mind, making it easy
            for anyone to navigate and make bookings.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>Reliable</Text>: We prioritize reliability to ensure your bookings are secure and
            confirmed.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.highlight}>24/7 Support</Text>: Our dedicated support team is available around the clock to assist you
            with any questions or issues.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.sectionText}>
          Our team is composed of passionate professionals who are committed
          to making Reserve-Mate the best booking platform available. We bring
          together expertise in technology, customer service, and industry
          knowledge to deliver a superior experience for our users.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.sectionText}>
          Reserve-Mate was born out of the need for a more efficient booking
          solution.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUsPage;
