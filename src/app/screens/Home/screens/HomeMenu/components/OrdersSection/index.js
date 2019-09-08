import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { ORDER_STATUS } from '@constants/orderStatus';
import { spicyGray, thunderbird } from '@constants/colors';

import styles from './styles';

function OrdersSection({ orders }) {
  const data = [
    {
      name: 'Cancelados',
      population: orders?.[ORDER_STATUS.CANCELLED] || 0,
      color: '#EF8301', // Naranja
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Rechazados',
      population: orders?.[ORDER_STATUS.REJECTED] || 0,
      color: thunderbird, // Rojo
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Entregados',
      population: orders?.[ORDER_STATUS.DELIVERED] || 0,
      color: '#053480', // Azul
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'En camino',
      population: orders?.[ORDER_STATUS.ON_WAY] || 0,
      color: '#009ED0', // Celeste
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Confirmados',
      population: orders?.[ORDER_STATUS.CONFIRMED] || 0,
      color: '#80AF51', // Verde
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Pendientes',
      population: orders?.[ORDER_STATUS.PENDING] || 0,
      color: '#EBEB42', // Amarillo
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
