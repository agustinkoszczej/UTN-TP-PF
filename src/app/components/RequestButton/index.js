import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Routes from '@constants/routes';
import CustomButton from '@components/CustomButton';
import requestIcon from '@assets/friend-request.png';
import { navigationModel } from '@propTypes/navigationModel';

import styles from './styles';

class RequestButton extends Component {
  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.AgendaRequest);
  };

  render() {
    return <CustomButton icon={requestIcon} onPress={this.handlePress} style={styles.icon} />;
  }
}

RequestButton.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default withNavigation(RequestButton);
