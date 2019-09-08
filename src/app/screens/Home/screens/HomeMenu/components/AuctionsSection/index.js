import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { AUCTION_STATUS } from '@constants/auctionStatus';
import { spicyGray } from '@constants/colors';

import styles from './styles';

function AuctionsSection({ auctions }) {
  const data = [
    {
      name: 'Cerradas',
      population: auctions?.[AUCTION_STATUS.CLOSED] || 0,
      color: '#EF8301', // Naranja
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Expiradas',
      population: auctions?.[AUCTION_STATUS.EXPIRED] || 0,
      color: '#053480', // Azul
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Activas',
      population: auctions?.[AUCTION_STATUS.ACTIVE] || 0,
      color: '#009ED0', // Celeste
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
          Subastas
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

AuctionsSection.propTypes = {
  auctions: PropTypes.shape({
    [AUCTION_STATUS.EXPIRED]: PropTypes.string,
    [AUCTION_STATUS.ACTIVE]: PropTypes.string,
    [AUCTION_STATUS.CLOSED]: PropTypes.string
  })
};

export default AuctionsSection;
