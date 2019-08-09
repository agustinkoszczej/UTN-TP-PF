import { string } from 'prop-types';

export const userModel = {
  email: string.isRequired,
  picture: string.isRequired,
  qrUrl: string.isRequired,
  latitude: string.isRequired,
  longitude: string.isRequired,
  streetAddress: string.isRequired,
  id: string.isRequired,
  companyName: string.isRequired,
  fullName: string.isRequired,
  cuit: string.isRequired,
  contactNumber: string.isRequired
};
