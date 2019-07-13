import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const VERTICAL_SPACING = 10;
const HORIZONTAL_SPACING = 7;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    flex: 1
  },
  keyboardAwareView: {
    width: '100%'
  },
  title: {
    marginBottom: VERTICAL_SPACING
  },
  subtitle: {
    paddingHorizontal: 27
  },
  emailInput: {
    marginTop: 60,
    marginHorizontal: HORIZONTAL_SPACING
  },
  inputError: {
    marginHorizontal: HORIZONTAL_SPACING
  },
  submitBtn: {
    marginTop: VERTICAL_SPACING
  },
  whiteText: {
    color: white
  }
});
export default styles;
