import { StyleSheet } from 'react-native';
import { white, alto } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: alto
  },
  bidContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    height: 250,
    padding: 20,
    justifyContent: 'space-around'
  },
  button: {
    width: 100
  },
  white: {
    color: white
  },
  row: {
    flexDirection: 'row'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 25
  },
  placeholder: {
    marginRight: 20
  }
});
export default styles;
