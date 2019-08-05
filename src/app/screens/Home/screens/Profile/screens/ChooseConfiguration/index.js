import React, { Component } from 'react';
import { View } from 'react-native';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';

import { strings } from './constants';
import styles from './styles';

class ChooseConfiguration extends Component {
  handleClick = () => {};

  render() {
    return (
      <View style={styles.container}>
        <CustomText bold>{strings.choose}</CustomText>

        <CustomButton
          secondaryBtn
          title={strings.editUserData}
          style={styles.button}
          onPress={this.handleClick}
        />
        <CustomButton
          secondaryBtn
          title={strings.editCompanyData}
          style={styles.button}
          onPress={this.handleClick}
        />
        <CustomButton
          secondaryBtn
          title={strings.editLocation}
          style={styles.button}
          onPress={this.handleClick}
        />
        <CustomButton secondaryBtn title={strings.editQR} style={styles.button} onPress={this.handleClick} />
      </View>
    );
  }
}

export default ChooseConfiguration;
