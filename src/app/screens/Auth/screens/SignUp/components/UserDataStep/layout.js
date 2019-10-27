import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import { PASSWORD_LENGTH, NAME_LENGTH } from '@constants/user';
import emailIcon from '@assets/ic_mail.png';
import userIcon from '@assets/ic_user.png';
import passwordIcon from '@assets/ic_password.png';

import { strings, SIGN_UP_FIELDS } from '../../constants';

import styles from './styles';

class UserDataStep extends Component {
  [SIGN_UP_FIELDS.EMAIL] = React.createRef();

  [SIGN_UP_FIELDS.PASSWORD] = React.createRef();

  handleNameSubmitting = () => {
    const { update } = this.props;
    if (!update) this[SIGN_UP_FIELDS.EMAIL].current.focus();
  };

  handleEmailSubmitting = () => {
    this[SIGN_UP_FIELDS.PASSWORD].current.focus();
  };

  render() {
    const { handleSubmit, onEmailChange, emailError, update } = this.props;
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
          name={SIGN_UP_FIELDS.NAME}
          placeholder={strings.name}
          onTextSubmitEditing={update ? handleSubmit : this.handleNameSubmitting}
          maxLength={NAME_LENGTH}
          applyTrim
          {...(update && { returnKeyType: 'go' })}
        />
        <CustomTextInput
          {...commonProps}
          keyboardType="email-address"
          labelIcon={emailIcon}
          name={SIGN_UP_FIELDS.EMAIL}
          placeholder={strings.email}
          onTextSubmitEditing={update ? handleSubmit : this.handleEmailSubmitting}
          invalid={!!emailError}
          error={emailError}
          onChange={onEmailChange}
          textRef={this[SIGN_UP_FIELDS.EMAIL]}
          applyTrim
          editable={!update}
        />

        {!update && (
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
        )}
      </View>
    );
  }
}

UserDataStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func,
  emailError: PropTypes.string,
  values: PropTypes.shape({
    phone: PropTypes.string
  }).isRequired,
  update: PropTypes.bool
};

export default UserDataStep;
