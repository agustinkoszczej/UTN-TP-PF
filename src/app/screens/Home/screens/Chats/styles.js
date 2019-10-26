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
    //borderWidth: 1,
    borderColor: alto,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    //borderRadius: 20
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
    flexDirection: 'row'
  },
  search: {
    width: '25%',
    marginLeft: '5%',
    marginBottom: 15
  },
  sended: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 15
  },
  item: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    //paddingLeft: 16,
    //paddingRight: 12,
    //paddingVertical: 8
  },
  messageText: {
    marginLeft: 15
  }
});
