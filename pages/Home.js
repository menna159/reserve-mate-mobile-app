import React from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import AboutUsSection from "./components/about-us-section/AboutUsSection";
import HeroHeaderSection from "./components/HomeComponents/HeroHeaderSection";
import SliderSection from "./components/HomeComponents/SliderSection";
import { routes } from "../routes";
import Logout from "./Logout";

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Button
          title="Profile"
          color="#dfa974"
          onPress={() => navigation.navigate(routes.profile)}
        />
        <Logout />
      </View> */}
      <ScrollView>
        <HeroHeaderSection />
        <AboutUsSection />
        <SliderSection />
      </ScrollView>
    </SafeAreaView>
  );
}
