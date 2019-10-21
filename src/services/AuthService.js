import { AsyncStorage } from 'react-native';
import api, { setAuthHeader } from '@config/api';

const TOKEN_STORAGE_KEY = '@Auth:token';

const setTokens = accessToken => {
  setAuthHeader(accessToken);
  AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(accessToken));
};

const getToken = () => AsyncStorage.getItem(TOKEN_STORAGE_KEY).then(JSON.parse);
const removeTokens = () => AsyncStorage.removeItem(TOKEN_STORAGE_KEY).then(JSON.parse);

const login = authData => api.post('/merchants/sign_in', authData);

const recoverPassword = email => api.post('/reset_password', email);

const signUp = authData => api.post('/merchants/sign_up', authData);

const getUserInfo = () => api.get('/users/profile');

const getAgenda = name => api.get('/merchants/agenda', { name });

const logOut = async () => {
  await removeTokens();
  return { ok: true };
};

const update = values => api.put('/users/profile', values);

const getSuppliers = name => api.get('/merchants/suppliers', { name });

const getStats = () => api.get('/merchants/stats');

const acceptRequest = id => api.patch(`/merchants/agenda/${id}`, { action: 'ADD' });
const declineRequest = id => api.patch(`/merchants/agenda/${id}`, { action: 'REMOVE' });

const getSupplierById = id => api.get(`/users/${id}`);

export default {
  login,
  recoverPassword,
  signUp,
  update,
  setTokens,
  getUserInfo,
  getToken,
  logOut,
  removeTokens,
  getAgenda,
  getSuppliers,
  getStats,
  acceptRequest,
  declineRequest,
  getSupplierById
};
