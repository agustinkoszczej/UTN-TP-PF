import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import CustomButton from '@components/CustomButton';
import plusIcon from '@assets/ic_plus.png';
import { navigationModel } from '@propTypes/navigationModel';

import styles from './styles';
import { ADD_ROUTES } from './constants';

class AddButton extends Component {
  handlePress = () => {
    const { navigation } = this.props;
    const {
      state: { routes, index }
    } = navigation;
    navigation.navigate(ADD_ROUTES[routes[index].routeName]);
  };

  render() {
    return <CustomButton icon={plusIcon} onPress={this.handlePress} style={styles.icon} />;
  }
}

AddButton.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default withNavigation(AddButton);
