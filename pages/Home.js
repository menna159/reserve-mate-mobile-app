import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AboutUsSection from "./components/about-us-section/AboutUsSection";
import HeroHeaderSection from "./components/HomeComponents/HeroHeaderSection";
import SliderSection from "./components/HomeComponents/SliderSection";
import BookingForm from "./BookingForm";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeroHeaderSection />
        <BookingForm />
        <AboutUsSection />
        <SliderSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
});
