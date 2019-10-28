import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import ChatService from '@services/ChatService';

import { roomSerializer } from './utils';

export const actions = createTypes(completeTypes(['GET_PUSHER_MANAGER'], []), '@@CHAT');

export const targets = {
  rooms: 'rooms'
};

export const actionCreators = {
  connectPusher: (userId, notificationHandler) => ({
    type: actions.GET_PUSHER_MANAGER,
    target: targets.rooms,
    payload: userId,
    service: ChatService.getPusherManager,
    successSelector: response => roomSerializer(response.data, userId),
    injections: [
      withPostSuccess((dispatch, _, state) => {
        if (notificationHandler) notificationHandler(dispatch, state);
      })
    ]
  })
};

export default actionCreators;
