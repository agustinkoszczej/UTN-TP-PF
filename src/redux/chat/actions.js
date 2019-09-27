import { completeTypes, createTypes, withPostSuccess, withPostFailure} from 'redux-recompose';
import ChatService from '@services/ChatService';

export const actions = createTypes(
  completeTypes(
    ['GET_PUSHER_MANAGER'],
    []
  ), '@@CHAT'
);

export const targets = {
  pusherManager: 'pusherManager'
};

export const actionCreators = {
  getPusherManager: userId => ({
    type: actions.GET_PUSHER_MANAGER,
    target: targets.pusherManager,
    payload: userId,
    service: ChatService.getPusherManager,
    // successSelector: response => response.data,
    // failureSelector: response => response,
    // injections: [
    //   withPostSuccess(dispatch => {
    //     dispatch(actionCreators.getPusherManager(userId));
    //   }),
    //   withPostFailure(dispatch => {
    //       //
    //   })
    // ]
  }),
};

export default actionCreators;
