import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import requestIcon from '@assets/friend-request.png';
import { navigationModel } from '@propTypes/navigationModel';
import { TouchableOpacity, Image, View } from 'react-native';

import styles from './styles';

class RequestButton extends Component {
  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.AgendaRequest);
  };

  render() {
    const { requests } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Image source={requestIcon} style={styles.icon} />
        {requests > 0 && (
          <View style={styles.counter}>
            <CustomText style={styles.white}>{requests}</CustomText>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

RequestButton.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  requests: PropTypes.number
};

const mapStateToProps = state => ({
  requests: state.auth.agenda?.requests.length || 0
});

const enhance = compose(
  withNavigation,
  connect(mapStateToProps)
);

export default enhance(RequestButton);
