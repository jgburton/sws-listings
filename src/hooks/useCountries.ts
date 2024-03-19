import countries from 'world-countries';
import { supportedCountries } from '../utilities';

const formattedCountries = countries
  .filter((country) => supportedCountries.includes(country.name.common))
  .map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
  }));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
