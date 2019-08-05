import { string } from 'prop-types';

export const userModel = {
  email: string.isRequired,
  picture: string.isRequired,
  qrUrl: string.isRequired,
  location: string.isRequired,
  streetAddress: string.isRequired,
  id: string.isRequired,
  companyName: string.isRequired,
  fullName: string.isRequired,
  cuit: string.isRequired,
  contactNumber: string.isRequired
};
