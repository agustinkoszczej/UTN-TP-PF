import { StyleSheet } from 'react-native';
import { black } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 175
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: black,
    borderWidth: 2
  },
  title: {
    fontSize: 24
  },
  category: {
    fontSize: 16
  },
  categoryPlaceholder: {
    fontSize: 16,
    marginRight: '20%'
  },
  productHeader: {
    alignItems: 'center',
    marginBottom: 20
  },
  categorySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  }
});
export default styles;
