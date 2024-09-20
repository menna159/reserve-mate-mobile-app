import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../routes';
import Carousel from 'react-native-reanimated-carousel';
import { styles } from './SliderSection.module';

const { width: screenWidth } = Dimensions.get('window');

const sliderData = [
  {
    id: 1,
    title: 'Greece',
    description: 'Experience the ancient wonders from the Acropolis to the beautiful islands of Santorini and Mykonos.',
    image: require('../../../images/Santorini-Greece.jpg'),
    textColor: '#000',
  },
  {
    id: 2,
    title: 'Italy',
    description: 'Discover the romance of Venice, the grandeur of Rome, and the beauty of Tuscany.',
    image: require('../../../images/pexels-pixabay-531602.jpg'),
    textColor: '#fff',
  },
  {
    id: 3,
    title: 'Egypt',
    description: 'Unveil the mysteries of Egypt with its majestic pyramids, ancient temples, and the Nile River.',
    image: require('../../../images/31 Top Landmarks in Egypt - Luxor Temple.jpeg'),
    textColor: '#fff',
  },
];

const SliderSection = () => {
  const navigation = useNavigation();

  const showHotelsClickHandler = () => navigation.navigate(routes.hotelsPage);

  return (
    <View style={styles.container}>
      <Carousel
        width={screenWidth*0.95}
        height={screenWidth * 0.6} 
        data={sliderData}
        autoPlay={true}
        autoPlayInterval={3000}
        loop={true}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: item.textColor }]}>{item.title}</Text>
              <Text style={[styles.description, { color: item.textColor }]}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.informationText}>
          We provide you with a variety of luxurious hotels in different places with various services. You can book the rooms you need in any hotel you choose, making it easy for you to enjoy a comfortable vacation.
        </Text>
        <TouchableOpacity style={styles.button} onPress={showHotelsClickHandler}>
          <Text style={styles.buttonText}>Show Hotels</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SliderSection;
