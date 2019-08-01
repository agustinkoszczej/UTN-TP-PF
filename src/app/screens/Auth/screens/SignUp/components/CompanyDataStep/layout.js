import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import { PHONE_LENGTH, NAME_LENGTH } from '@constants/user';
import phoneIcon from '@assets/ic_phone.png';
import userIcon from '@assets/ic_user.png';
import noteIcon from '@assets/ic_note.png';

import { strings, SIGN_UP_FIELDS } from '../../constants';

import styles from './styles';

class CompanyDataStep extends Component {
  [SIGN_UP_FIELDS.CUIT] = React.createRef();

  [SIGN_UP_FIELDS.PHONE] = React.createRef();

  handleCUITSubmitting = () => {
    this[SIGN_UP_FIELDS.PHONE].current.focus();
  };

  handleNameSubmitting = () => {
    this[SIGN_UP_FIELDS.CUIT].current.focus();
  };

  render() {
    const { handleSubmit, onCUITChange, cuitError } = this.props;
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <View style={styles.container}>
        <CustomTextInput
          {...commonProps}
          autoCapitalize="words"
          labelIcon={userIcon}
          name={SIGN_UP_FIELDS.COMPANY_NAME}
          placeholder={strings.name}
          onTextSubmitEditing={this.handleNameSubmitting}
          maxLength={NAME_LENGTH}
          applyTrim
        />
        <CustomTextInput
          {...commonProps}
          keyboardType="phone-pad"
          labelIcon={noteIcon}
          name={SIGN_UP_FIELDS.CUIT}
          placeholder={strings.cuit}
          textRef={this[SIGN_UP_FIELDS.CUIT]}
          onTextSubmitEditing={this.handleCUITSubmitting}
          invalid={!!cuitError}
          error={cuitError}
          onChange={onCUITChange}
          applyTrim
          maxLength={11}
        />
        <CustomTextInput
          {...commonProps}
          keyboardType="phone-pad"
          labelIcon={phoneIcon}
          name={SIGN_UP_FIELDS.PHONE}
          placeholder={strings.phone}
          textRef={this[SIGN_UP_FIELDS.PHONE]}
          onTextSubmitEditing={handleSubmit}
          maxLength={PHONE_LENGTH}
          returnKeyType="go"
        />
      </View>
    );
  }
}

CompanyDataStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    phone: PropTypes.string
  }).isRequired,
  onCUITChange: PropTypes.func.isRequired,
  cuitError: PropTypes.string.isRequired
};

export default CompanyDataStep;
