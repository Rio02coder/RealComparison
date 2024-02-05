import ModifiedDataPayload from '../../../types/search/filters/ModifiedDataPayload';

const getModifiedData = <ItemType extends any>(
  range: ItemType[],
  stringifyItem?: (item: ItemType) => string,
): ModifiedDataPayload<ItemType>[] =>
  range.map(item => ({
    label: stringifyItem ? stringifyItem(item) : String(item),
    value: item,
  }));

export default getModifiedData;
