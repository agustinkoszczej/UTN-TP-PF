export const roomSerializer = (data, userId) =>
  data.rooms.map(({ id: roomId, unreadCount, lastMessageAt, customData, userStore }) => {
    // const { avatar_url: supplierPicture, presenceStore } = users[userId];
    const supplierName = customData.nameByUser[userId];
    // const online = presenceStore[userId] !== 'offline';
    const supplierId = Object.keys(customData.nameByUser).filter(ids => ids !== userId)[0];
    return {
      // supplierPicture,
      roomId,
      lastMessageAt,
      supplierName,
      // online,
      supplierId,
      unreadCount
    };
  });
