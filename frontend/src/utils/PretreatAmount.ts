export const pretreatAmount = (amount: number) => {
  if (amount === 0) {
    return amount;
  }
  if (amount > 10000 && amount % 10000) {
    const tmp = amount.toString();
    const result = Math.floor(amount / 10000).toString() + '억 ' + (amount % 10000) + '만';
    return result;
  } else if (amount % 10000 === 0) {
    const result = (amount / 10000).toString() + '억';
    return result;
  } else {
    return amount.toString() + '만';
  }
};
