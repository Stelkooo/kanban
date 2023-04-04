export const sortByOrder = <T, Y>(array: T[], order: Y[], key: string) => {
  const sortedArray = [...array].sort(
    (a, b) => order.indexOf(a[key]) - order.indexOf(b[key])
  );
  return sortedArray;
};

export default sortByOrder;
