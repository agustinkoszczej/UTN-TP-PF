import api from '@config/api';

const login = authData => api.post('/sign_in', authData);

const recoverPassword = () => {
  return {
    ok: true,
    status: 200
  };
};

const signUp = () => {
  return {
    ok: true,
    status: 200
  };
};

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
  update
};
