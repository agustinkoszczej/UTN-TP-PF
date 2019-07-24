import { number, shape, string } from 'prop-types';

export const customStyles = shape({
  stepIndicatorSize: number,
  currentStepIndicatorSize: number,
  separatorStrokeWidth: number,
  separatorStrokeUnfinishedWidth: number,
  finishedSeparatorStrokeWidth: number,
  currentStepStrokeWidth: number,
  stepStrokeWidth: number,
  currentStepStrokeColor: string,
  finishedStepStrokeColor: string,
  unfinishedStepStrokeColor: string,
  finishedSeparatorColor: string,
  unfinishedSeparatorColor: string,
  finishedStepIndicatorColor: string,
  unfinishedStepIndicatorColor: string,
  currentStepIndicatorColor: string,
  stepIndicatorLabelFontSize: number,
  currentStepIndicatorLabelFontSize: number,
  currentStepIndicatorLabelColor: string,
  finishedStepIndicatorLabelColor: string,
  unfinishedStepIndicatorLabelColor: string,
  labelColor: string,
  labelSize: number,
  labelAlign: string,
  currentStepLabelColor: string
});
