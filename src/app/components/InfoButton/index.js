import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation, NavigationActions } from 'react-navigation';
import CustomButton from '@components/CustomButton';
import infoIcon from '@assets/info.png';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import AuthActions from '@redux/auth/actions';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import styles from './styles';

class AddButton extends Component {
  handlePress = () => {
    const { navigation, navigateToSupplier } = this.props;
    const id = navigation.state.params.supplierId;
    navigateToSupplier(id);
  };

  render() {
    return <CustomButton icon={infoIcon} onPress={this.handlePress} style={styles.icon} />;
  }
}

AddButton.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  navigateToSupplier: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  navigateToSupplier: id =>
    dispatch(
      AuthActions.getAgenda('', () => {
        dispatch(AuthActions.getSupplierById(id));
        dispatch(NavigationActions.navigate({ routeName: Routes.SupplierProfile }));
      })
    )
});

const enhancer = compose(
  withNavigation,
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhancer(AddButton);
