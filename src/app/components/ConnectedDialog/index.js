import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogActions from '@redux/dialog/actions';

import { dialogComponents } from './dialogTypes';

function ConnectedDialog({ dialogType, ...props }) {
  const Dialog = dialogComponents[dialogType];
  return Dialog ? <Dialog {...props} /> : <></>;
}

ConnectedDialog.propTypes = {
  dialogType: PropTypes.string
};

const mapStateToProps = state => ({
  isVisible: state.dialog.isVisible,
  dialogContent: state.dialog.dialog?.dialogContent,
  dialogType: state.dialog.dialog?.dialogType
});

const mapDispatchToProps = dispatch => ({
  onCloseDialog: () => dispatch(DialogActions.closeDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDialog);
