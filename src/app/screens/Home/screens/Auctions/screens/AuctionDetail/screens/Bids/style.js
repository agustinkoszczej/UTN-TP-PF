import { StyleSheet } from 'react-native';
import { white, alto } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: alto
  },
  bidContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 30,
    justifyContent: 'space-around'
  },
  button: {
    width: 100
  },
  white: {
    color: white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 25
  },
  productImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -15
  },
  placeholder: {
    marginRight: 20
  }
});
export default styles;
