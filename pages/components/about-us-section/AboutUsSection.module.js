import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  fadeIn: {
    opacity: 0, 
  },

  sectionTitle: {
    textAlign: 'center',
    marginBottom: 22,
  },

  sectionTitleSpan: {
    fontSize: 14,
    color: '#dfa974',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  sectionTitleH2: {
    fontSize: 35,
    color: '#19191a',
    lineHeight: 58,
    marginTop: 10,
  },

  aboutText: {
    textAlign: 'center',
    paddingHorizontal: 35,
  },

  aboutTextP: {
    fontSize: 16,
    fontFamily: 'Cabin, sans-serif', 
    color: '#6b6b6b',
    fontWeight: '400',
    lineHeight: 26,
    marginBottom: 15,
  },

  fpara: {
    marginBottom: 10,
  },

  spara: {
    marginBottom: 35,
  },

  aboutBtnText: {
    color: '#dfa974',
    fontWeight:"bold"
  },

  spad: {
    paddingTop: 100,
    paddingBottom: 100,
  },

  aboutBtn: {
    display: 'inline-block', 
    fontSize: 13,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    textDecorationLine: 'none',
    position: 'relative',
    paddingBottom: 5, 
  },

  aboutBtnUnderline: {
    position: 'absolute',
    left: 0,
    bottom: -5,
    width: '100%',
    height: 2,
    backgroundColor: '#dfa974',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flex: 1,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageCol: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default styles;
