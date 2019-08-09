import { StyleSheet } from 'react-native';
import { white, black } from '@constants/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 5
  }
});

export default styles;
