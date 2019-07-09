import { StyleSheet } from 'react-native';

const MARGIN = 30;

const styles = StyleSheet.create({
  content: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: MARGIN
  },
  buttonContainer: {
    width: '100%'
  },
  acceptButton: {
    marginBottom: MARGIN
  },
  denyButton: {
    alignSelf: 'center'
  },
  title: {
    marginBottom: 10,
    width: '100%'
  },
  contentContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: MARGIN
  },
  backgroundImage: {
    width: '100%'
  }
});

export default styles;
