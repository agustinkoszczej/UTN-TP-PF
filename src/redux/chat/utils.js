export const roomSerializer = (rooms, userId) =>
  rooms.map(({ id, unreadCount, lastMessageAt, userStore: { users } }) => {
    const { avatar_url: avatarUrl, id: supplierId, name, presenceStore } = users[userId];
    const online = presenceStore[userId] !== 'offline';
    return {
      avatarUrl,
      id,
      lastMessageAt,
      name,
      online,
      supplierId,
      unreadCount
    };
  });
