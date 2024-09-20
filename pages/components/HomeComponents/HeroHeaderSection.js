import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { styles } from "./HeroHeaderSection.module";
const HeroHeaderSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: require("../../../images/hero-1.jpg"), 
      title: "Reserve Mate",
      description:
        "At Reserve-Mate, we are dedicated to simplifying the reservation process for both businesses and customers.",
    },
    {
      image: require("../../../images/hero-2.jpg"),
      title: "Reserve Mate",
      description:
        "Our platform is designed to streamline bookings, making it easier and more efficient for everyone involved.",
    },
    {
      image: require("../../../images/hero-3.jpg"),
      title: "Reserve Mate",
      description:
        "We connect people with the services they need in the most convenient way possible.",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        contentOffset={{ x: activeSlide * Dimensions.get("window").width, y: 0 }}
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <View style={styles.caption}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



export default HeroHeaderSection;
