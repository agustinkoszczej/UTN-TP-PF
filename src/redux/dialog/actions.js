import { createTypes } from 'redux-recompose';

export const actions = createTypes(
  ['CLOSE_DIALOG', 'DELETE_DIALOG', 'SHOW_DIALOG', 'SET_DIALOG'],
  '@@DIALOG'
);

const dialogTargets = {
  DIALOG: 'dialog',
  VISIBLE: 'isVisible'
};

const privateActionCreators = {
  setDialog: ({ dialogType, dialogContent = undefined }) => ({
    type: actions.SET_DIALOG,
    payload: { dialogType, dialogContent },
    target: dialogTargets.DIALOG
  }),
  showDialog: () => ({
    type: actions.SHOW_DIALOG,
    target: dialogTargets.VISIBLE,
    payload: true
  }),
  closeDialog: () => ({
    type: actions.CLOSE_DIALOG,
    target: dialogTargets.VISIBLE,
    payload: false
  }),
  deleteDialog: () => ({
    type: actions.DELETE_DIALOG,
    target: dialogTargets.DIALOG,
    payload: null
  })
};

const actionCreators = {
  showDialog: dialog => dispatch => {
    dispatch(privateActionCreators.closeDialog());
    dispatch(privateActionCreators.setDialog(dialog));
    dispatch(privateActionCreators.showDialog());
  },
  closeDialog: () => dispatch => {
    dispatch(privateActionCreators.closeDialog());
    dispatch(privateActionCreators.deleteDialog());
  }
};

export default actionCreators;
