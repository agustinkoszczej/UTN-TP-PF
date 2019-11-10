import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { AUCTION_STATUS } from '@constants/auctionStatus';
import { spicyGray } from '@constants/colors';
import empty from '@lottieAssets/chart.json';

import styles from './styles';

function AuctionsSection({ auctions }) {
  const data = [
    {
      name: 'Cerradas',
      population: parseInt(auctions?.[AUCTION_STATUS.CLOSED], 10) || 0,
      color: '#388087',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Expiradas',
      population: parseInt(auctions?.[AUCTION_STATUS.EXPIRED], 10) || 0,
      color: '#6fb3b8',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Activas',
      population: parseInt(auctions?.[AUCTION_STATUS.ACTIVE], 10) || 0,
      color: '#badfe7',
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
  const hasAuctions = auctions && Object.values(auctions).some(val => val);
  return (
    <>
      <Card style={styles.title}>
        <CustomText center middle>
          Subastas
        </CustomText>
      </Card>
      <>
        {hasAuctions ? (
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
              No posees ninguna subasta
            </CustomText>
          </View>
        )}
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
