export const isItemDisabled = (enabledItems, item) => enabledItems && !enabledItems.includes(item?.option);

export const getSelectedItem = (array, item, enabledSide) =>
  enabledSide
    ? array.find(({ id, side }) => item.id === id && side === enabledSide)
    : array.find(({ id }) => item.id === id);

export const getSelectedItems = (array, item, enabledSide) =>
  enabledSide
    ? array?.filter(({ id, side }) => item.id !== id || (item.id === id && side !== enabledSide))
    : array?.filter(({ id }) => item.id !== id);

export const getSelectedItemsWithTooltip = (array, item, enabledSide) =>
  enabledSide
    ? array?.map(e => (e?.id === item?.id && e?.side === enabledSide ? item : e))
    : array?.map(e => (e?.id === item?.id ? item : e));

export const getSingleOptionSelectedItems = (enabledSide, isSelected, item, selectedItems) => {
  if (isSelected) return selectedItems;
  if (enabledSide) {
    if (!selectedItems.find(({ side }) => side === enabledSide)) {
      return [...selectedItems, item];
    }
    return selectedItems?.map(selectedItem => (selectedItem?.side === enabledSide ? item : selectedItem));
  }
  return [item];
};
