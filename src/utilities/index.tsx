// Round to nearest million or billion
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

// Get todays date - temp
export const getFormattedDate = (): string => {
  const currentDate = new Date();
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
};

export interface ScoreData {
  value: number;
  income: number;
  health: number;
  past: number;
  future: number;
  management: number;
  misc: number;
  total: number;
  sentence: string;
}

// Create useful score data for snowflake
export const createUsefulScoreData = (
  data: ScoreData
): { [key: string]: number } => {
  // Ideal order
  const keyOrder: string[] = ['Value', 'Future', 'Past', 'Health', 'Dividend'];

  // New object with correct keyOrder
  const usefulScoreData: { [key: string]: number } = {};
  keyOrder.forEach((key: string) => {
    if (key === 'Dividend') {
      // Handle 'income' key representing 'Dividend' for the UI
      usefulScoreData[key] = data['income'];
    } else {
      usefulScoreData[key] = data[key.toLowerCase()];
    }
  });

  return usefulScoreData;
};

export const supportedCountries = [
  'Global',
  'United States',
  'Australia',
  'United Kingdom',
  'Canada',
  'India',
  'China',
  'Argentina',
  'Austria',
  'Bahrain',
  'Bangladesh',
  'Belgium',
  'Bermuda',
  'Botswana',
  'Brazil',
  'Bulgaria',
  'Chile',
  'Colombia',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Ghana',
  'Greece',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kenya',
  'Kuwait',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malawi',
  'Malaysia',
  'Malta',
  'Mauritius',
  'Mexico',
  'Morocco',
  'Namibia',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palestinian Authority',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Tanzania',
  'Thailand',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'Venezuela',
  'Vietnam',
  'Zambia',
  'Zimbabwe',
];
