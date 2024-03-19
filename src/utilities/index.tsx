export const roundToNearestMillionOrBillion = (num: string) => {
  const number = parseInt(num);

  switch (true) {
    case Math.abs(number) >= 1e9:
      return Math.round((number / 1e9) * 10) / 10 + 'b';
    case Math.abs(number) >= 1e6:
      return Math.round((number / 1e6) * 10) / 10 + 'm';
    default:
      return number.toString();
  }
};
