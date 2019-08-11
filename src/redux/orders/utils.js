export const ordersSerialiazer = ({ orders, pages, total }) => {
  const serialiazedOrders = orders.map(
    ({ id, status, deliveryDate, amount, comment, supplierId, receiverName, supplier }) => ({
      id,
      status,
      deliveryDate,
      amount,
      comment,
      supplierId,
      receiverName,
      receiverPicture: supplier.picture
    })
  );
  return {
    pages,
    total,
    orders: serialiazedOrders
  };
};
