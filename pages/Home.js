import React from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";
import AboutUsSection from "./components/about-us-section/AboutUsSection";
import HeroHeaderSection from "./components/HomeComponents/HeroHeaderSection";
import SliderSection from "./components/HomeComponents/SliderSection";
import { routes } from "../routes";

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <HeroHeaderSection />
        {/* <Button
          title="Profile"
          color="#dfa974"
          onPress={() => navigation.navigate(routes.profile)}
        /> */}
        <AboutUsSection />
        <SliderSection />
      </ScrollView>
    </SafeAreaView>
  );
}
