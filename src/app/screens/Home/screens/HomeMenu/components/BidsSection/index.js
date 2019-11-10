import React from 'react';
import { Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { PieChart } from 'react-native-chart-kit';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { BID_STATUS } from '@constants/bidsStatus';
import { spicyGray } from '@constants/colors';
import LottieView from 'lottie-react-native';
import empty from '@lottieAssets/chart.json';

import styles from './styles';

function BidsSection({ bids }) {
  const data = [
    {
      name: 'Aceptadas',
      population: parseInt(bids?.[BID_STATUS.ACCEPTED], 10) || 0,
      color: '#319E11',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Activas',
      population: parseInt(bids?.[BID_STATUS.ACTIVE], 10) || 0,
      color: '#4AEE1A',
      legendFontColor: spicyGray,
      legendFontSize: 13
    },
    {
      name: 'Declinadas',
      population: parseInt(bids?.[BID_STATUS.DEECLINED], 10) || 0,
      color: '#B2FF9B',
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
  const hasBids = bids && Object.values(bids).some(val => val);
  return (
    <View style={{ marginBottom: 30 }}>
      <Card style={styles.title}>
        <CustomText center middle>
          Ofertas de subastas
        </CustomText>
      </Card>
      {hasBids ? (
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
          <CustomText style={{ left: 200, top: 50, width: 150, fontSize: 20 }}>
            No posees ninguna oferta de subasta
          </CustomText>
        </View>
      )}
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
