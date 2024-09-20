import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%', // full width
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },

  title: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
  },

  section: {
    marginBottom: 40,
  },

  sectionTitle: {
    fontSize: 36,
    marginBottom: 15,
    color: '#e09f5d',
    textAlign: 'center',
  },

  sectionText: {
    fontSize: 18,
    lineHeight: 24, // approximate line height in pixels
    color: '#555',
    textAlign: 'center',
  },

  list: {
    marginLeft: 20,
    marginBottom: 10,
  },

  listItem: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },

  highlight: {
    color: '#000',
  },

  contactInfo: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },

  contactInfoList: {
    padding: 0,
  },

  contactInfoItem: {
    marginBottom: 10,
  },

  contactInfoLabel: {
    width: 100,
  },

  formContainer: {
    marginTop: 40,
  },

  formGroup: {
    marginBottom: 20,
  },

  formGroupLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },

  formGroupInput: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    color: '#000',
  },

  formGroupTextarea: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    resizeMode: 'vertical', // React Native doesn't have resize for inputs, so resizeMode can be used
    height: 150,
    color: '#000',
  },

  submitButton: {
    width: '25%',
    padding: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#e09f5d',
    borderWidth: 0,
    borderRadius: 4,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;
