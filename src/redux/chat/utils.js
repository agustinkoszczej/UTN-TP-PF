export const roomSerializer = (data, userId) =>
  data.rooms.map(({ id: roomId, unreadCount, lastMessageAt, customData }) => {
    const supplierPicture = customData.dataByUser[userId].picture;
    const supplierName = customData.dataByUser[userId].fullName;
    // const online = presenceStore[userId] !== 'offline';
    const supplierId = customData.dataByUser[userId].user_id;
    return {
      supplierPicture,
      roomId,
      lastMessageAt,
      supplierName,
      // online,
      supplierId,
      unreadCount
    };
  });
