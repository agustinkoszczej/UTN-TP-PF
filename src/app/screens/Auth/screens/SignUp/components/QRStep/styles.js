import { StyleSheet } from 'react-native';
import { alto, white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: 120
  },
  inputTitle: {
    marginBottom: 4
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderColor: alto,
    borderRadius: 4,
    borderWidth: 1,
    height: 35
  },
  errorStyle: {
    position: 'absolute',
    bottom: -30
  },
  couponInput: {
    flex: 0.8
  },
  couponSubmit: {
    flex: 0.2
  },
  disabled: {
    backgroundColor: white
  },
  disabledText: {
    color: alto
  },
  scannerButton: {
    alignItems: 'flex-start',
    marginTop: 10
  }
});

export default styles;
