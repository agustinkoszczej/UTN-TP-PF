import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Loadable from '@components/Loadable';

import styles from './styles';

function WithError({ acceptText, asset, description, handleError, title }) {
  return (
    <View style={styles.container}>
      <Image source={asset} resizeMode="contain" style={styles.icon} />
      <CustomText title center style={styles.titleContent}>
        {title}
      </CustomText>
      {description && (
        <CustomText primary center style={styles.descriptionContent}>
          {description}
        </CustomText>
      )}
      {handleError && (
        <CustomButton
          primaryBtn
          style={styles.modifyBtn}
          textStyle={styles.white}
          title={acceptText}
          onPress={handleError}
        />
      )}
    </View>
  );
}

WithError.defaultProps = {
  acceptText: 'Intente nuevamente',
  title: 'Error'
};

WithError.propTypes = {
  acceptText: PropTypes.string,
  asset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string.isRequired
    })
  ]),
  description: PropTypes.string,
  handleError: PropTypes.func,
  title: PropTypes.string
};

export default Loadable(props => props.loading)(WithError);
