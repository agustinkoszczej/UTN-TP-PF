export const strings = {
  emailValidation: 'El email es inválido',
  facebookLogIn: 'Facebook',
  forgotPassword: 'Olvidé mi contraseña',
  googleLogIn: 'Google',
  hasAccount: '¿Aún no tenés cuenta?',
  loginMessage: 'Ingresar',
  orderWithoutRegister: 'Ordenar sin registrarse',
  orLogIn: 'O inicia sesión',
  password: 'Contraseña',
  signUp: 'Regístrate',
  email: 'Email',
  notAuthorized: 'Email y/o contraseña incorrecta',
  notConfirmed: 'La cuenta no ha sido confirmada',
  defaultLoginError: 'Hubo un error al iniciar sesión'
};

export const LOGIN_FIELDS = {
  USERNAME: 'username',
  PASSWORD: 'password'
};

export const apiErrors = error =>
  ({
    invalid_grant: strings.notAuthorized
  }[error] || (error ? strings.defaultLoginError : null));
