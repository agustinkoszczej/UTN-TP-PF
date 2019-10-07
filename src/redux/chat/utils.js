export const roomSerializer = (rooms, userId) =>
  rooms.map(({ id, unreadCount, lastMessageAt, userStore: { users } }) => {
    const { avatar_url: supplierPicture, id: supplierId, name, presenceStore } = users[userId];
    const online = presenceStore[userId] !== 'offline';
    return {
      supplierPicture,
      id,
      lastMessageAt,
      name,
      online,
      supplierId,
      unreadCount
    };
  });
