import { string, bool } from 'prop-types';

export const userModel = {
  email: string.isRequired,
  picture: string.isRequired,
  qrUrl: string,
  latitude: string,
  longitude: string,
  streetAddress: string.isRequired,
  id: string,
  companyName: string.isRequired,
  fullName: string.isRequired,
  cuit: string.isRequired,
  contactNumber: string.isRequired,
  isSupplier: bool
};
