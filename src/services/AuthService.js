import { AsyncStorage } from 'react-native';
import api, { setAuthHeader } from '@config/api';

const TOKEN_STORAGE_KEY = '@Auth:token';

const setTokens = ({ access_token: accessToken }) => {
  setAuthHeader(accessToken);
  AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(accessToken));
};

const getToken = () => AsyncStorage.getItem(TOKEN_STORAGE_KEY).then(JSON.parse);
const removeTokens = () => AsyncStorage.removeItem(TOKEN_STORAGE_KEY).then(JSON.parse);

const login = authData => api.post('/merchants/sign_in', authData);

const recoverPassword = email => api.post('/reset_password', email);

const signUp = authData => api.post('/merchants/sign_up', authData);

const getUserInfo = () => api.get('/users/profile');

const update = () => {
  return {
    ok: true,
    status: 200
  };
};

export default {
  login,
  recoverPassword,
  signUp,
  update,
  setTokens,
  getUserInfo,
  getToken
};
