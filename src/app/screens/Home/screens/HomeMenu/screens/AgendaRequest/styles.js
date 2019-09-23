import { StyleSheet } from 'react-native';
import { alto, white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: alto,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  cardContainer: {
    marginBottom: 50,
    padding: 20
  },
  white: {
    color: white
  },
  row: {
    flexDirection: 'row'
  },
  alignItems: {
    alignItems: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  button: {
    width: '45%'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  bottom: {
    marginBottom: 15
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15
  }
});
export default styles;
