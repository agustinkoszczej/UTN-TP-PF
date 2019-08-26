import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';
import CustomDialog from '@components/CustomDialog';
import CustomText from '@components/CustomText';
import OrderActions from '@redux/orders/actions';
import { userModel } from '@propTypes/userModel';

import styles from './styles';

class RateDialog extends Component {
  state = { rating: 0 };

  handleAccept = () => {
    const { rateOrder } = this.props;
    const { rating } = this.state;
    rateOrder(rating);
  };

  handleRatingChange = rating => this.setState({ rating });

  render() {
    const {
      isVisible,
      currentSupplier: { fullName, picture }
    } = this.props;
    return (
      <CustomDialog
        singleAction
        visible={isVisible}
        acceptTitle="Valorar"
        onAcceptDialog={this.handleAccept}
        style={styles.container}
      >
        <View style={styles.content}>
          <CustomText title center style={styles.title}>
            Valorá el servicio del distribuidor
          </CustomText>
          <Image source={{ uri: picture }} style={styles.image} />
          <CustomText title center style={styles.title}>
            {fullName}
          </CustomText>
          <AirbnbRating
            onFinishRating={this.handleRatingChange}
            reviews={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
          />
        </View>
      </CustomDialog>
    );
  }
}

RateDialog.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  rateOrder: PropTypes.func.isRequired,
  currentSupplier: PropTypes.shape(userModel).isRequired
};

const mapStateToProps = state => ({
  currentSupplier: state.orders.currentOrder.supplier
});

const mapDispatchToProps = dispatch => ({
  rateOrder: rating => dispatch(OrderActions.rateOrder(rating))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateDialog);
