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

export const validationInputs = FIELDS => field =>
  ({
    [FIELDS.NAME]: string()
      .required(strings.requiredValidation)
      .min(3, strings.invalidNameMsg)
      .matches(nameRegex, strings.invalidSpecialCharacters),
    [FIELDS.EMAIL]: string()
      .matches(emailRegex, strings.invalidEmailMsg)
      .required(strings.requiredValidation),
    [FIELDS.PHONE]: string()
      .required(strings.requiredValidation)
      .min(COUNTRY_CODE.length + 1, strings.requiredValidation)
      .matches(phoneRegex, strings.invalidPhoneMsg)
      .matches(phoneStartsWithCodeRegex, strings.invalidPhoneLengthMsg(COUNTRY_CODE))
      .length(PHONE_LENGTH, strings.invalidPhoneLengthMsg(PHONE_LENGTH - 1)),
    [FIELDS.PASSWORD]: string()
      .required(strings.requiredValidation)
      .min(8, strings.invalidPasswordMin)
      .matches(passwordRegex, strings.invalidPasswordMsg)
  }[field]);

export const fieldsValidation = arrayInputs =>
  arrayInputs.reduce((fields, nameField) => ({ ...fields, [nameField]: validationInputs(nameField) }), {});
