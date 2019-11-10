import { StyleSheet } from 'react-native';

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
    marginHorizontal: 20
  },
  ellipsis: {
    width: 100,
    overflow: 'hidden',
    textAlign: 'right'
  }
});
export default styles;
