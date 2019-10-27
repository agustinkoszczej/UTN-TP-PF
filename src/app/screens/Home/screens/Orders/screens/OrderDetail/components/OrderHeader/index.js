import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import StatusTag from '@components/StatusTag';
import Card from '@components/Card';
import { IS_ACTIVE_STATUS } from '@constants/orderStatus';
import { dateFormat } from '@utils/timeUtils';
import { formatMoney } from '@utils/numberUtils';
import SeparatorWithText from '@components/SeparatorWithText';

import styles from './styles';

function OrderHeader({
  supplier,
  receiverName,
  comment,
  amount,
  deliveryDate,
  status,
  showRateModal,
  rated,
  creation
}) {
  const fullName = supplier?.fullName || receiverName;
  const textProps = { numberOfLines: 1 };
  return (
    <>
      <Card style={styles.cardContainer}>
        <SeparatorWithText text="Detalle de pedido" style={{ marginBottom: 15 }} />
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Distribuidor:</CustomText>
          <CustomText textProps={textProps} style={styles.ellipsis} bold>
            {fullName}
          </CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Comentario:</CustomText>
          <CustomText textProps={textProps} style={styles.ellipsis} bold>
            {comment}
          </CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Precio:</CustomText>
          <CustomText bold>{formatMoney(amount)}</CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Fecha de entrega:</CustomText>
          <CustomText bold>{dateFormat(deliveryDate)}</CustomText>
        </View>
        {status && <StatusTag status={status} />}
      </Card>
      {!IS_ACTIVE_STATUS(status) && !rated && !creation && (
        <Card style={styles.rateButton}>
          <CustomButton title="Valorar" onPress={showRateModal} />
        </Card>
      )}
    </>
  );
}

OrderHeader.propTypes = {
  showRateModal: PropTypes.func,
  rated: PropTypes.bool,
  creation: PropTypes.bool,
  supplier: PropTypes.shape({
    fullName: PropTypes.string
  }),
  deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  amount: PropTypes.string.isRequired,
  receiverName: PropTypes.string.isRequired,
  status: PropTypes.string,
  comment: PropTypes.string.isRequired
};

export default OrderHeader;
