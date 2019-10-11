import { completeState, completeReducer, createReducer, onReadValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';
import PropTypes from 'prop-types';

import { actions } from './actions';

const stateDescription = {
  unreadNotifications: [],
  readNotifications: [],
  token: null,
  user: null
};

const initialState = completeState(stateDescription, ['unreadNotifications', 'readNotifications', 'token']);

const reducerDescription = {
  primaryActions: [actions.UPDATE_TOKEN, actions.DELETE_TOKEN],
  override: {
    [actions.REGISTER]: onReadValue(),
    [actions.NOTIFICATION_RECEIVED]: (state, action) => {
      const push = action.payload.notification;
      return state.merge(
        {
          unreadNotifications: push.userInteraction
            ? state.unreadNotifications.filter(unreadPush => push.id !== unreadPush.id)
            : state.unreadNotifications.concat([push]),
          readNotifications: push.userInteraction
            ? state.readNotifications.concat([push])
            : state.readNotifications
        },
        { deep: true }
      );
    }
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

const notificationPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired
  // TODO: extend notification model definition
});

export const propTypes = {
  notification: notificationPropTypes,
  notificationList: PropTypes.arrayOf(notificationPropTypes)
};
