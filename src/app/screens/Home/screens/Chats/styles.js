import { StyleSheet } from 'react-native';
import { transparent, alto, black, white } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    padding: 20
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%'
  },
  supplierContainer: {
    height: 75,
    maxWidth: '100%',
    // borderWidth: 1,
    borderColor: alto,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
    // borderRadius: 20
  },
  supplierPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
  selected: {
    borderWidth: 2,
    borderColor: black
  },
  white: {
    color: white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  sended: {
    width: 15,
    height: 15
  },
  messageText: {
    width: '70%',
    overflow: 'hidden',
    opacity: 0.5
  },
  margin: {
    marginLeft: 15
  },
  name: {
    width: '70%',
    overflow: 'hidden',
    fontSize: 16
  },
  upperChat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2.5
  }
});
