export const sortByOrder = (array: [], order: [], key: string) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};

export default sortByOrder;
