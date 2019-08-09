import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '@utils/scalingUtils';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25
  },
  icon: {
    height: verticalScale(75),
    width: verticalScale(75),
    borderRadius: 50,
    marginRight: 20
  },
  name: {
    fontSize: 24,
    color: white
  },
  email: {
    fontSize: 16,
    color: white
  },
  button: {
    width: scale(250),
    marginTop: 20
  },
  userSection: {
    flex: 1,
    flexDirection: 'row'
  },
  nameSection: {
    justifyContent: 'space-evenly'
  }
});
export default styles;
