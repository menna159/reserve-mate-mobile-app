// SliderSection.module.js
import { Dimensions, StyleSheet } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    height: '100%',
  },
  carouselItem: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -50 }],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  informationText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#dfa974',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
