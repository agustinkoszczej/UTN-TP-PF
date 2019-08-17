import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import StepIndicator from '@components/CustomStepper';
import CustomButton from '@components/CustomButton';
import BaseForm from '@components/BaseForm';
import Loadable from '@components/Loadable';

import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS, strings, CREATE_ORDER_FIELDS } from './constants';
import styles, { stepIndicatorStyles } from './styles';
import OrderStep from './components/OrderStep';
import SupplierStep from './components/SupplierStep';
import ProductStep from './components/ProductStep';
import DetailStep from './components/DetailStep';

class CreateOrder extends Component {
  componentDidUpdate(prevProps) {
    const { currentStep, setTouched } = this.props;
    if (prevProps.currentStep !== currentStep) setTouched(false);
  }

  render() {
    const { currentStep, handleSubmit, values, setFieldValue, onBack } = this.props;
    const finalStep = currentStep === 3;
    return (
      <BaseForm>
        <View style={styles.container}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={currentStep}
            stepCount={STEP_INDICATOR_STEPS}
            labels={STEP_INDICATOR_LABELS}
            currentStepCompleted
          />
          {
            {
              0: <SupplierStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />,
              1: <OrderStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />,
              2: <ProductStep handleSubmit={handleSubmit} values={values} />,
              3: <DetailStep handleSubmit={handleSubmit} values={values} />
            }[currentStep]
          }
          <View style={styles.buttons}>
            {currentStep > 0 && (
              <CustomButton
                primaryBtn
                onPress={onBack}
                title={strings.back}
                textStyle={styles.whiteText}
                style={styles.backButton}
              />
            )}
            <CustomButton
              primaryBtn
              onPress={handleSubmit}
              title={!finalStep ? strings.next : strings.createButton}
              textStyle={styles.whiteText}
              style={[styles.createButton, currentStep === 0 && { width: '100%' }]}
            />
          </View>
        </View>
      </BaseForm>
    );
  }
}

CreateOrder.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.string,
    [CREATE_ORDER_FIELDS.SUPPLIER_ID]: PropTypes.string,
    [CREATE_ORDER_FIELDS.SUPPLIER_PICTURE]: PropTypes.string,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date),
    [CREATE_ORDER_FIELDS.RECEIVER_NAME]: PropTypes.string
  }).isRequired,
  currentStep: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    // validationSchema: ({ validationSchema, currentStep }) => validationSchema[currentStep],
    handleSubmit: (values, { props }) =>
      props.currentStep === 3 ? props.onCreateOrder(values) : props.onNext()
  }),
  Loadable(props => props.loading)
);

export default enhancer(CreateOrder);
