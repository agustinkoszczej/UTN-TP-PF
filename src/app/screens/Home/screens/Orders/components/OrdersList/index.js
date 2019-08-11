import React from 'react';
import { Text } from 'react-native';
import worried from '@assets/worried.png';
import { compose } from 'recompose';
import Loadable from '@components/Loadable';
import WithError from '@components/WithError';

function OrdersList() {
  return <Text>Hola</Text>;
}

const enhance = compose(
  WithError(
    ({ error, orders }) => error || orders?.length === 0,
    ({ orders, loading, getOrders, error, current }) => ({
      asset: orders?.length === 0 ? worried : undefined,
      handleError: error && getOrders,
      title:
        orders?.length === 0
          ? current
            ? 'No tenes pedidos actuales'
            : 'No tenes pedidos pasados'
          : undefined,
      loading
    })
  ),
  Loadable(props => props.loading, true)
);

export default enhance(OrdersList);
