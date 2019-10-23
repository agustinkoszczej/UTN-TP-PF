export const userSerializer = ({
  email,
  user_id: id,
  picture,
  user_metadata: { fullName, companyName, contactNumber, streetAddress, cuit, qrUrl, location, rating }
}) => {
  const locations = location.split(',');
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
    picture,
    rating: rating?.score || {}
  };
};

export const supplierSerializer = (
  {
    email,
    user_id: id,
    picture,
    fullName,
    companyName,
    contactNumber,
    streetAddress,
    cuit,
    qrUrl,
    location,
    rating,
    inAgenda
  },
  getState
) => {
  const locations = location.split(',');
  const {
    auth: {
      agenda: { requests, ownRequests }
    },
    chat: { rooms }
  } = getState();
  const room = rooms.find(chat => chat.supplierId === id);
  const isRequesting = ownRequests.some(request => request.user_id === id);
  const requestSend = requests.some(request => request.user_id === id);
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
    picture,
    rating: rating?.score || {},
    inAgenda,
    isSupplier: true,
    room,
    requestSend,
    isRequesting
  };
};
