import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import { PASSWORD_LENGTH } from '@constants/user';
import emailIcon from '@assets/ic_mail.png';
import passwordIcon from '@assets/ic_password.png';

import { strings, SIGN_UP_FIELDS } from '../../constants';

import styles from './styles';

class UsernameStep extends Component {
  [SIGN_UP_FIELDS.PASSWORD] = React.createRef();

  handleEmailSubmitting = () => {
    this[SIGN_UP_FIELDS.PASSWORD].current.focus();
  };

  render() {
    const { handleSubmit, onEmailChange, emailError } = this.props;
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
          keyboardType="email-address"
          labelIcon={emailIcon}
          name={SIGN_UP_FIELDS.EMAIL}
          placeholder={strings.email}
          onTextSubmitEditing={this.handleEmailSubmitting}
          invalid={!!emailError}
          error={emailError}
          onChange={onEmailChange}
          applyTrim
        />
        <CustomTextInput
          {...commonProps}
          labelIcon={passwordIcon}
          name={SIGN_UP_FIELDS.PASSWORD}
          placeholder={strings.password}
          showEye
          returnKeyType="go"
          secureTextEntry
          textRef={this[SIGN_UP_FIELDS.PASSWORD]}
          onTextSubmitEditing={handleSubmit}
          maxLength={PASSWORD_LENGTH}
          avoidSpaces
        />
      </View>
    );
  }
}

UsernameStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func,
  emailError: PropTypes.string,
  values: PropTypes.shape({
    phone: PropTypes.string
  }).isRequired
};

export default UsernameStep;
