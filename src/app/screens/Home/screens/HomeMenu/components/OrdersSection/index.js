import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { ORDER_STATUS } from '@constants/orderStatus';
import { spicyGray } from '@constants/colors';
import LottieView from 'lottie-react-native';
import empty from '@lottieAssets/chart.json';

import styles from './styles';

function OrdersSection({ orders }) {
  const data = [
    {
      name: 'Cancelados',
      population: parseInt(orders?.[ORDER_STATUS.CANCELLED], 10) || 0,
      color: '#F1F1F1',

      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Rechazados',
      population: parseInt(orders?.[ORDER_STATUS.REJECTED], 10) || 0,
      color: '#C9C9C9',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Entregados',
      population: parseInt(orders?.[ORDER_STATUS.DELIVERED], 10) || 0,
      color: '#9D9D9D',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'En camino',
      population: parseInt(orders?.[ORDER_STATUS.ON_WAY], 10) || 0,
      color: '#737373',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Confirmados',
      population: parseInt(orders?.[ORDER_STATUS.CONFIRMED], 10) || 0,
      color: '#4E4E4E',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Pendientes',
      population: parseInt(orders?.[ORDER_STATUS.PENDING], 10) || 0,
      color: '#111111',
      legendFontColor: spicyGray,
      legendFontSize: 13
    }
  ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };
  const hasOrders = orders && Object.values(orders).some(val => val);
  return (
    <>
      <Card style={styles.title}>
        <CustomText center middle>
          Pedidos
        </CustomText>
      </Card>
      {hasOrders ? (
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <View style={{ height: 200, width: 200, flexDirection: 'row' }}>
          <LottieView source={empty} autoPlay loop={false} />
          <CustomText style={{ left: 200, top: 75, width: 150, fontSize: 20 }}>
            No posees ningun pedido
          </CustomText>
        </View>
      )}
    </>
  );
}

OrdersSection.propTypes = {
  orders: PropTypes.shape({
    [ORDER_STATUS.DELIVERED]: PropTypes.string,
    [ORDER_STATUS.CONFIRMED]: PropTypes.string,
    [ORDER_STATUS.REJECTED]: PropTypes.string,
    [ORDER_STATUS.ON_WAY]: PropTypes.string,
    [ORDER_STATUS.PENDING]: PropTypes.string,
    [ORDER_STATUS.CANCELLED]: PropTypes.string
  })
};

export default OrdersSection;
