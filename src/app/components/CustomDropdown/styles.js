import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const ICON_SIZE = 18;
const ICON_DIMENSION = 15;
const ITEM_HEIGHT = 50;
export const MAX_ITEMS = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textWrapper: {
    height: '100%',
    justifyContent: 'center'
  },
  button: {
    flex: 0.1
  },
  buttonIcon: {
    width: ICON_DIMENSION,
    height: ICON_DIMENSION
  },
  optionWrapper: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 15,
    maxHeight: ITEM_HEIGHT * MAX_ITEMS + MAX_ITEMS - 1,
    flexGrow: 0
  },
  modalContent: {
    flexGrow: 1
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginRight: 5
  }
});
