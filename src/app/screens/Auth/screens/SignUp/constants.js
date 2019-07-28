export const STEP_INDICATOR_LABELS = ['Usuario y contraseña', 'Datos empresa', 'Ubicación', 'QR'];
export const STEP_INDICATOR_STEPS = 4;

export const strings = {
  defaultRegisterError: 'Hubo un error al registrarse. Vuelva a intentarlo',
  email: 'Email',
  goBack: 'Volver',
  hasAccount: '¿Ya tienes cuenta?',
  logIn: 'Inicia Sesión',
  name: 'Nombre',
  password: 'Contraseña',
  phone: 'Teléfono',
  signUpButton: 'Crear Cuenta',
  signUpTitle: 'Soy Nuevo',
  usernameExists: 'Ya existe una cuenta con el email ingresado.',
  next: 'Siguiente',
  cuit: 'CUIT'
};

export const SIGN_UP_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
  CUIT: 'cuit',
  QR_URL: 'qrUrl',
  LOCATION: 'location'
};

export const inputFieldsSignUp = [SIGN_UP_FIELDS.NAME, SIGN_UP_FIELDS.PHONE, SIGN_UP_FIELDS.CUIT];

export const authFieldsSignUp = [SIGN_UP_FIELDS.EMAIL, SIGN_UP_FIELDS.PASSWORD];

export const LOCATION_FIELDS = {
  ADDRESS: 'address',
  LATITUDE: 'latitude',
  LONGITUDE: 'longitude',
  STREET_NUMBER: 'stretNumber'
};
