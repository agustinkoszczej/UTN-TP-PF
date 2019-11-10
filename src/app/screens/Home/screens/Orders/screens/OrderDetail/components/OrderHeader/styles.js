import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 30,
    margin: 20
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  placeholder: {
    marginRight: 20
  },
  rateButton: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  ellipsis: {
    width: 150,
    overflow: 'hidden',
    textAlign: 'right'
  },
  white: {
    color: white
  }
});
export default styles;
