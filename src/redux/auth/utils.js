export const userSerializer = ({
  email,
  user_id: id,
  picture,
  user_metadata: { fullName, companyName, contactNumber, streetAddress, cuit, qrUrl, location }
}) => {
  return {
    email,
    id,
    fullName,
    streetAddress,
    qrUrl,
    location,
    contactNumber,
    companyName,
    cuit,
    picture
  };
};
