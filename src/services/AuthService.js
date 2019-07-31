import api from '@config/api';

const login = authData => api.post('/merchants/sign_in', authData);

const recoverPassword = email => api.post('/reset_password', email);

const signUp = authData => api.post('/merchants/sign_up', authData);

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
