import React from 'react';
import PropTypes from 'prop-types';

import OrderDetail from '../../../OrderDetail/layout';
import { CREATE_ORDER_FIELDS } from '../../constants';

function DetailStep({ values }) {
  return <OrderDetail order={values} creation />;
}

DetailStep.propTypes = {
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.number,
    [CREATE_ORDER_FIELDS.SUPPLIER_ID]: PropTypes.string,
    [CREATE_ORDER_FIELDS.SUPPLIER_PICTURE]: PropTypes.string,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date),
    [CREATE_ORDER_FIELDS.RECEIVER_NAME]: PropTypes.string,
    [CREATE_ORDER_FIELDS.PRODUCTS]: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
      })
    )
  }).isRequired
};

export default DetailStep;
