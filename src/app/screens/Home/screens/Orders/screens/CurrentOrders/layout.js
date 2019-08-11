import React from 'react';
import { Text } from 'react-native';
import worried from '@assets/worried.png';
import { compose } from 'recompose';
import Loadable from '@components/Loadable';
import WithError from '@components/WithError';

function CurrentOrders() {
  return <Text>Hola</Text>;
}

const enhance = compose(
  WithError(
    ({ error, currentOrders }) => error || currentOrders?.length === 0,
    ({ currentOrders, loading, getOrders, error }) => ({
      asset: currentOrders?.length === 0 ? worried : undefined,
      handleError: error && getOrders,
      title: currentOrders?.length === 0 ? 'No tenes pedidos actuales' : undefined,
      loading
    })
  ),
  Loadable(props => props.loading, true)
);

export default enhance(CurrentOrders);
