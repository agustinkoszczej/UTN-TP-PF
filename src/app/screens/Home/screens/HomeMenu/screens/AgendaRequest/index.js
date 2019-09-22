import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import AuthActions from '@redux/auth/actions';
import WithError from '@components/WithError';
import worried from '@assets/worried.png';

import styles from './styles';

class AgendaRequest extends Component {
  renderItem = ({ item: { fullName, companyName, user_id: id } }) => (
    <Card style={styles.cardContainer}>
      <CustomText>{fullName}</CustomText>
      <CustomText>{companyName}</CustomText>
      <View style={styles.row}>
        <CustomButton
          primaryBtn
          onPress={this.handleAccept(id)}
          textStyle={styles.white}
          style={styles.button}
          title="Aceptar"
          loading={this.props.acceptLoading}
        />
        <CustomButton
          primaryBtn
          onPress={this.handleDecline(id)}
          textStyle={styles.white}
          style={styles.button}
          title="Declinar"
          loading={this.props.declineLoading}
        />
      </View>
    </Card>
  );

  handleAccept = id => () => {
    const { acceptRequest } = this.props;
    acceptRequest(id);
  };

  handleDecline = id => () => {
    const { declineRequest } = this.props;
    declineRequest(id);
  };

  handleRefresh = () => {
    const { refreshAgenda } = this.props;
    refreshAgenda();
  };

  keyExtractor = ({ user_id: id }) => `${id}`;

  render() {
    const { requests, refreshing } = this.props;
    return (
      <FlatList
        data={requests}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
        extraData={this.props}
        style={styles.container}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

AgendaRequest.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  acceptRequest: PropTypes.func.isRequired,
  refreshAgenda: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  acceptLoading: PropTypes.bool.isRequired,
  declineLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  requests: state.auth.agenda?.requests || [],
  refreshing: state.auth.agendaLoading,
  declineLoading: state.auth.declineContactLoading,
  acceptLoading: state.auth.acceptContactLoading
});

const mapDispatchToProps = dispatch => ({
  acceptRequest: id => dispatch(AuthActions.acceptRequest(id)),
  refreshAgenda: () => dispatch(AuthActions.getAgenda()),
  declineRequest: id => dispatch(AuthActions.declineRequest(id))
});

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithError(
    ({ error, requests }) => error || requests?.length === 0,
    ({ refreshing, error }) => ({
      asset: worried,
      handleError: error && this.handleRefresh,
      title: 'No tienes solicitudes de amistad',
      loading: refreshing
    })
  )
);

export default enhancer(AgendaRequest);
