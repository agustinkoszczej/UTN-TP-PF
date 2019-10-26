import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { ORDER_STATUS } from '@constants/orderStatus';
import { spicyGray } from '@constants/colors';

import styles from './styles';

function OrdersSection({ orders }) {
  const data = [
    {
      name: 'Cancelados',
      population: parseInt(orders?.[ORDER_STATUS.CANCELLED], 10) || 0,
      color: '#D85F49',

      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Rechazados',
      population: parseInt(orders?.[ORDER_STATUS.REJECTED], 10) || 0,
      color: '#F66D3B',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Entregados',
      population: parseInt(orders?.[ORDER_STATUS.DELIVERED], 10) || 0,
      color: '#D92E1D',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'En camino',
      population: parseInt(orders?.[ORDER_STATUS.ON_WAY], 10) || 0,
      color: '#D73C4C',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Confirmados',
      population: parseInt(orders?.[ORDER_STATUS.CONFIRMED], 10) || 0,
      color: '#FFAF59',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Pendientes',
      population: parseInt(orders?.[ORDER_STATUS.PENDING], 10) || 0,
      color: '#E28300',
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
  return (
    <>
      <Card style={styles.title}>
        <CustomText center middle>
          Pedidos
        </CustomText>
      </Card>
      <>
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
      </>
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
