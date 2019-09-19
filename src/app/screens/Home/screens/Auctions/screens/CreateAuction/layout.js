import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import StepIndicator from '@components/CustomStepper';
import CustomButton from '@components/CustomButton';
import BaseForm from '@components/BaseForm';

import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS, strings, CREATE_AUCTIONS_FIELDS } from './constants';
import styles, { stepIndicatorStyles } from './styles';
import AuctionStep from './components/AuctionStep';
import DetailStep from './components/DetailStep';
import ProductsStep from './components/ProductsStep';

class CreateAuction extends Component {
  componentDidUpdate(prevProps) {
    const { currentStep, setTouched } = this.props;
    if (prevProps.currentStep !== currentStep) setTouched(false);
  }

  render() {
    const { currentStep, handleSubmit, values, setFieldValue, onBack, loading } = this.props;
    const finalStep = currentStep === 2;
    return (
      <BaseForm link onSubmit={handleSubmit}>
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
              0: <AuctionStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />,
              1: <ProductsStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />,
              2: <DetailStep handleSubmit={handleSubmit} values={values} />
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
              loading={loading}
              style={[styles.createButton, currentStep === 0 && { width: '100%' }]}
            />
          </View>
        </View>
      </BaseForm>
    );
  }
}

CreateAuction.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_AUCTIONS_FIELDS.PAYMENT_METHOD]: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number
      })
    ),
    [CREATE_AUCTIONS_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date),
    [CREATE_AUCTIONS_FIELDS.PRODUCTS]: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
      })
    )
  }).isRequired,
  currentStep: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema, currentStep }) => validationSchema[currentStep],
    handleSubmit: (values, { props }) =>
      props.currentStep === 2 ? props.onCreateAuction(values) : props.onNext()
  })
);

export default enhancer(CreateAuction);
