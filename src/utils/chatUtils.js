export const LOAD_EARLIER_QUANTITY = 10;

export const messageSerializer = (message, name, avatar) => {
  const { id, senderId, text, createdAt, roomId } = message;
  return {
    _id: id,
    text,
    createdAt: new Date(createdAt),
    user: {
      _id: senderId,
      name,
      avatar
    },
    roomId
  };
};