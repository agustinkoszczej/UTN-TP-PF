export const STEP_INDICATOR_LABELS = ['Datos personales', 'Datos empresariales', 'Ubicación', 'QR'];
export const STEP_INDICATOR_STEPS = 4;

export const strings = {
  defaultRegisterError: 'Hubo un error al registrarse. Vuelva a intentarlo',
  email: 'Email',
  goBack: 'Volver',
  hasAccount: '¿Ya tienes cuenta?',
  logIn: 'Inicia Sesión',
  name: 'Nombre',
  companyName: 'Nombre compañia',
  password: 'Contraseña',
  phone: 'Teléfono',
  signUpButton: 'Crear Cuenta',
  signUpTitle: 'Soy Nuevo',
  usernameExists: 'Ya existe una cuenta con el email ingresado.',
  next: 'Siguiente',
  cuit: 'CUIT',
  back: 'Volver'
};

export const SIGN_UP_FIELDS = {
  ADDRESS: 'streetAddress',
  COMPANY_NAME: 'companyName',
  CUIT: 'cuit',
  EMAIL: 'email',
  LOCATION: 'location',
  NAME: 'fullName',
  PASSWORD: 'password',
  PHONE: 'contactNumber',
  QR_URL: 'qrUrl',
  STREET_NUMBER: 'streetNumber',
  LATITUDE: 'longitude',
  LONGITUDE: 'latitude'
};

export const inputFieldsSignUp = [SIGN_UP_FIELDS.COMPANY_NAME, SIGN_UP_FIELDS.CUIT, SIGN_UP_FIELDS.PHONE];

export const authFieldsSignUp = [SIGN_UP_FIELDS.NAME, SIGN_UP_FIELDS.EMAIL, SIGN_UP_FIELDS.PASSWORD];
