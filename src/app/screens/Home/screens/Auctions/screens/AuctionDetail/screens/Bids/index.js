import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import AuctionActions from '@redux/auctions/actions';
import Card from '@components/Card';
import SeparatorWithText from '@components/SeparatorWithText';
import { navigationModel } from '@propTypes/navigationModel';
import { dateFormat } from '@utils/timeUtils';
import { formatMoney } from '@utils/numberUtils';
import { BID_STATUS } from '@constants/bidsStatus';

import styles from './style';

class Bids extends Component {
  renderItem = ({
    item: {
      id,
      deliveryDate,
      shipmentCost,
      supplier: { fullName, picture }
    }
  }) => {
    const { loading } = this.props;
    return (
      <Card style={styles.bidContainer}>
        <SeparatorWithText text="Detalle de oferta" />
        <View style={styles.row}>
          <Image style={styles.image} source={{ uri: picture }} />
          <CustomText>{fullName}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText style={styles.placeholder}>Fecha de entrega:</CustomText>
          <CustomText>{dateFormat(deliveryDate)}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText style={styles.placeholder}>Costo de envío:</CustomText>
          <CustomText>{formatMoney(shipmentCost)}</CustomText>
        </View>
        <View style={[styles.row, styles.spaceAround]}>
          <CustomButton
            primaryBtn
            loading={loading}
            style={styles.button}
            textStyle={styles.white}
            title="Aceptar"
            onPress={this.handleBidAction(id, BID_STATUS.ACCEPTED)}
          />
          <CustomButton
            primaryBtn
            loading={loading}
            style={styles.button}
            textStyle={styles.white}
            title="Rechazar"
            onPress={this.handleBidAction(id, BID_STATUS.DECLINED)}
          />
        </View>
      </Card>
    );
  };

  handleBidAction = (id, status) => () => {
    const { executeBid, navigation } = this.props;
    executeBid(id, status, navigation.getParam('auctionId'));
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { navigation } = this.props;
    const bids = navigation.getParam('bids');
    return (
      <FlatList
        data={bids}
        style={styles.container}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

Bids.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  executeBid: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auctions.executeBidLoading
});

const mapDispatchToProps = {
  executeBid: AuctionActions.executeBid
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhancer(Bids);
