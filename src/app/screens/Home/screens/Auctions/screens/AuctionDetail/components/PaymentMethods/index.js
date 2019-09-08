import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import SeparatorWithText from '@components/SeparatorWithText';

import PaymentIcon from './components/PaymentIcon';

class PaymentMethods extends Component {
  renderItem = ({ item: { description, id } }) => (
    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
      <PaymentIcon id={id} />
      <CustomText style={{ marginLeft: 20 }}>{description}</CustomText>
    </View>
  );

  renderSeparator = () => <SeparatorWithText text="Métodos de pago" />;

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { methods } = this.props;
    return (
      <Card style={{ marginHorizontal: 20, padding: 20 }}>
        <FlatList
          data={methods}
          ListHeaderComponent={this.renderSeparator}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </Card>
    );
  }
}

PaymentMethods.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({}))
};

export default PaymentMethods;
