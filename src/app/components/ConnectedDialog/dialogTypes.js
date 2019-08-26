import SimpleDialog from './components/SimpleDialog';
import RateDialog from './components/RateDialog';

const dialogTypes = {
  SIMPLE_DIALOG: 'simpleDialog',
  RATE_DIALOG: 'rateDialog'
};

export const dialogComponents = {
  [dialogTypes.SIMPLE_DIALOG]: SimpleDialog,
  [dialogTypes.RATE_DIALOG]: RateDialog
};

export default dialogTypes;
