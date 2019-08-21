import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import CustomButton from '@components/CustomButton';
import searchIcon from '@assets/ic_search.png';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';

import styles from './styles';

class AddButton extends Component {
  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.Search);
  };

  render() {
    return <CustomButton icon={searchIcon} onPress={this.handlePress} style={styles.icon} />;
  }
}

AddButton.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default withNavigation(AddButton);
