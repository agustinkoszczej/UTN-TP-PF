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

import styles from './style';

class Bids extends Component {
  renderItem = ({
    item: {
      id,
      deliveryDate,
      shipmentCost,
      supplier: { fullName, picture },
      bidProducts
    }
  }) => {
    const { declineBidLoading, declineBidLoadingId, acceptBidLoading, acceptBidLoadingId } = this.props;
    const total = bidProducts.reduce(
      (accum, product) => parseFloat(product.bidProduct.amount, 10) + accum,
      0
    );
    const loadAccept = acceptBidLoading && acceptBidLoadingId === id;
    const loadDecline = declineBidLoading && declineBidLoadingId === id;
    return (
      <Card style={styles.bidContainer}>
        <SeparatorWithText text="Detalle de oferta" />
        <View style={[styles.row, { marginTop: 10 }]}>
          <Image style={styles.image} source={{ uri: picture }} />
          <CustomText>{fullName}</CustomText>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <CustomText style={styles.placeholder}>Fecha de entrega:</CustomText>
          <CustomText>{dateFormat(deliveryDate)}</CustomText>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <CustomText style={styles.placeholder}>Total:</CustomText>
          <CustomText>{formatMoney(total)}</CustomText>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <CustomText style={styles.placeholder}>Costo de envío:</CustomText>
          <CustomText>{formatMoney(shipmentCost)}</CustomText>
        </View>
        <FlatList
          data={bidProducts}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={<SeparatorWithText text="Productos ofertados" />}
          renderItem={this.renderBidProduct}
        />
        <View style={[styles.row, styles.spaceBetween]}>
          <CustomButton
            primaryBtn
            loading={loadAccept}
            style={styles.button}
            textStyle={styles.white}
            title="Aceptar"
            onPress={this.acceptBid(id)}
          />
          <CustomButton
            primaryBtn
            loading={loadDecline}
            style={styles.button}
            textStyle={styles.white}
            title="Rechazar"
            onPress={this.declineBid(id)}
          />
        </View>
      </Card>
    );
  };

  renderBidProduct = ({
    item: {
      product: { description, imageUrl },
      bidProduct: { amount }
    }
  }) => (
    <View style={[styles.row, { marginVertical: 10, justifyContent: 'space-between' }]}>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <CustomText
          textProps={{ numberOfLines: 1 }}
          style={{ width: 200, overflow: 'hidden', marginHorizontal: 10 }}
        >
          {description}
        </CustomText>
      </View>
      <CustomText style={{ bottom: 5 }}>{formatMoney(amount)}</CustomText>
    </View>
  );

  acceptBid = id => () => {
    const { acceptBid, navigation } = this.props;
    acceptBid(id, navigation.getParam('auctionId'));
  };

  declineBid = id => () => {
    const { declineBid, navigation } = this.props;
    declineBid(id, navigation.getParam('auctionId'));
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
        extraData={this.props}
      />
    );
  }
}

Bids.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  acceptBidLoading: PropTypes.bool,
  acceptBidLoadingId: PropTypes.number,
  declineBidLoading: PropTypes.bool,
  declineBidLoadingId: PropTypes.number
};

const mapStateToProps = state => ({
  acceptBidLoading: state.auctions.acceptBidLoading,
  acceptBidLoadingId: state.auctions.acceptBidLoadingId,
  declineBidLoadingId: state.auctions.declineBidLoadingId,
  declineBidLoading: state.auctions.declineBidLoading
});

const mapDispatchToProps = {
  acceptBid: AuctionActions.acceptBid,
  declineBid: AuctionActions.declineBid
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhancer(Bids);
