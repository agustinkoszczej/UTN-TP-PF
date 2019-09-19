import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { BID_STATUS } from '@constants/bidsStatus';
import { spicyGray, thunderbird } from '@constants/colors';

import styles from './styles';

function BidsSection({ bids }) {
  const data = [
    {
      name: 'Aceptadas',
      population: parseInt(bids?.[BID_STATUS.ACCEPTED], 10) || 0,
      color: thunderbird, // Rojo
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Activas',
      population: parseInt(bids?.[BID_STATUS.ACTIVE], 10) || 0,
      color: '#053480', // Azul
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Declinadas',
      population: parseInt(bids?.[BID_STATUS.DEECLINED], 10) || 0,
      color: '#80AF51', // Verde
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
    <View style={{ marginBottom: 30 }}>
      <Card style={styles.title}>
        <CustomText center middle>
          Ofertas de subastas
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
    </View>
  );
}

BidsSection.propTypes = {
  bids: PropTypes.shape({
    [BID_STATUS.ACTIVE]: PropTypes.string,
    [BID_STATUS.DEECLINED]: PropTypes.string,
    [BID_STATUS.ACCEPTED]: PropTypes.string
  })
};

export default BidsSection;
