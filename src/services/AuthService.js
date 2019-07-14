const login = authData => {
  return {
    ok: true,
    status: 200
  };
};

const recoverPassword = email => {
  return {
    ok: true,
    status: 200
  };
};

export default {
  login,
  recoverPassword
};
