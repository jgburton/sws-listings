export const roundToNearestBillionOrMillion = (num: string) => {
  const number = parseInt(num);

  if (Math.abs(number) >= 1e9) {
    return Math.round((number / 1e9) * 10) / 10 + 'b';
  } else if (Math.abs(number) >= 1e6) {
    return Math.round((number / 1e6) * 10) / 10 + 'm';
  } else {
    return number.toString();
  }
};
