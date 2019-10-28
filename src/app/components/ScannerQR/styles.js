import { StyleSheet } from 'react-native';

import { SCREEN_SIZE } from './constants';

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const landDimensions = SCREEN_SIZE.width * 0.25;
const rectDimensions = SCREEN_SIZE.width * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_SIZE.width * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#fff";

const scanBarWidth = SCREEN_SIZE.width * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_SIZE.width * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "red";


const iconScanColor = "#fff";

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_SIZE.width,
    width: SCREEN_SIZE.width,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_SIZE.width,
    width: SCREEN_SIZE.width,
    backgroundColor: overlayColor,
    paddingBottom: landDimensions
  },

  leftAndRightOverlay: {
    height: rectDimensions,
    width: SCREEN_SIZE.width,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
});

export { styles, iconScanColor };
