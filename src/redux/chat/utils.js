export const roomSerializer = (data, userId) =>
  data.rooms.map(room => {
    const {
      id: roomId,
      unreadCount,
      lastMessageAt,
      customData: { dataByUser },
      userStore: { presenceStore }
    } = room;
    const supplierId = Object.keys(dataByUser).find(id => id !== userId);
    const { fullName: supplierName, picture: supplierPicture } = dataByUser[userId];
    const online = (presenceStore[supplierId] === 'online')? 'online' : 'offline';

    return {
      supplierPicture,
      roomId,
      lastMessageAt,
      supplierName,
      online,
      supplierId,
      unreadCount
    };
  });
