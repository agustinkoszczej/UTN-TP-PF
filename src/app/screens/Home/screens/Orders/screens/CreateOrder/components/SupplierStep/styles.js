import { StyleSheet } from 'react-native';
import { transparent, alto, black, white } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginBottom: 10
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '70%'
  },
  supplierContainer: {
    height: 65,
    borderWidth: 1,
    borderColor: alto,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  supplierPicture: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 30
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
  valueSelected: {
    height: 65,
    //marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
