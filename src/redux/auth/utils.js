export const userSerializer = ({
  email,
  user_id: id,
  picture,
  user_metadata: { fullName, companyName, contactNumber, streetAddress, cuit, qrUrl, location }
}) => {
  const locations = location.split(',').map(loc => parseInt(loc, 10));
  return {
    email,
    id,
    fullName,
    streetAddress,
    qrUrl,
    latitude: locations[0],
    longitude: locations[1],
    contactNumber,
    companyName,
    cuit,
    picture
  };
};
