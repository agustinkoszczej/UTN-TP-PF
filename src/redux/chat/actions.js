import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import ChatService from '@services/ChatService';

export const actions = createTypes(completeTypes(['GET_PUSHER_MANAGER', 'SET_ROOMS'], []), '@@CHAT');

export const targets = {
  pusherConnection: 'pusherConnection',
  rooms: 'rooms'
};

const privateActions = {
  setRooms: rooms => ({
    type: actions.SET_ROOMS,
    target: targets.rooms,
    payload: rooms
  })
};

export const actionCreators = {
  connectPusher: userId => ({
    type: actions.GET_PUSHER_MANAGER,
    target: targets.pusherConnection,
    payload: userId,
    service: ChatService.getPusherManager,
    successSelector: () => true,
    injections: [
      withPostSuccess((dispatch, response) => {
        dispatch(privateActions.setRooms(response.data.rooms));
      })
    ]
  }),
  setRooms: rooms => ({
    type: actions.SET_ROOMS,
    target: targets.rooms,
    payload: rooms
  })
};

export default actionCreators;
