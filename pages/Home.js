import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AboutUsSection from "./components/about-us-section/AboutUsSection";
import HeroHeaderSection from "./components/HomeComponents/HeroHeaderSection";
import SliderSection from "./components/HomeComponents/SliderSection";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeroHeaderSection />
        <AboutUsSection />
        <SliderSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the SafeAreaView takes full height
  },
  scrollContainer: {
    flexGrow: 1, // Allows the ScrollView to grow
    padding: 16, // Add padding for aesthetic
  },
});
