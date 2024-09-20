import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import AboutUsSection from './components/about-us-section/AboutUsSection';
import HeroHeaderSection from './components/HomeComponents/HeroHeaderSection';
import SliderSection from './components/HomeComponents/SliderSection';

export default function Home() {
  return (
    <SafeAreaView>
    <ScrollView>
      <HeroHeaderSection />
      <AboutUsSection />
      <SliderSection />
    </ScrollView>
    </SafeAreaView>
  );
}
