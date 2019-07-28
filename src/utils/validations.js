import { string } from 'yup';
import { COUNTRY_CODE, PHONE_LENGTH } from '@constants/user';
import { strings } from '@constants/formikStrings';
import {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  phoneStartsWithCodeRegex
} from '@constants/validations';
import { SIGN_UP_FIELDS as FIELDS } from '@screens/Auth/screens/SignUp/constants';

export const authInputs = field =>
  ({
    [FIELDS.EMAIL]: string()
      .matches(emailRegex, strings.invalidEmailMsg)
      .required(strings.requiredValidation),
    [FIELDS.PASSWORD]: string()
      .required(strings.requiredValidation)
      .min(8, strings.invalidPasswordMin)
      .matches(passwordRegex, strings.invalidPasswordMsg)
  }[field]);

export const dataInputs = field =>
  ({
    [FIELDS.NAME]: string()
      .required(strings.requiredValidation)
      .min(3, strings.invalidNameMsg)
      .matches(nameRegex, strings.invalidSpecialCharacters),
    [FIELDS.PHONE]: string()
      .required(strings.requiredValidation)
      .min(COUNTRY_CODE.length + 2, strings.requiredValidation)
      .matches(phoneRegex, strings.invalidPhoneMsg)
      .matches(phoneStartsWithCodeRegex, strings.invalidPhoneLengthMsg(COUNTRY_CODE))
      .length(PHONE_LENGTH, strings.invalidPhoneLengthMsg(PHONE_LENGTH - 1)),
    [FIELDS.CUIT]: string()
      .required(strings.requiredValidation)
      .length(11, strings.invalidCUITLength)
  }[field]);

export const authValidation = arrayInputs =>
  arrayInputs.reduce((fields, nameField) => ({ ...fields, [nameField]: authInputs(nameField) }), {});

export const dataValidation = arrayInputs =>
  arrayInputs.reduce((fields, nameField) => ({ ...fields, [nameField]: dataInputs(nameField) }), {});
