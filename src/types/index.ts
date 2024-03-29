export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ScoreData {
  value: number;
  income: number;
  health: number;
  past: number;
  future: number;
  management: number;
  misc: number;
  total: number;
  // sentence: string;
}

interface Score {
  data: ScoreData;
}

interface PrimaryIndustry {
  id: number;
  name: string;
}

interface CurrencyInfo {
  reporting_unit_abs: number;
  reporting_currency_iso: string;
  trading_item_currency_iso: string;
  reporting_unit_text: string;
  reporting_unit_text_abs: string;
  primary_trading_item_currency_symbol: string;
  reporting_currency_symbol: string;
  reporting_unit: number;
  trading_item_currency_symbol: string;
  primary_trading_item_currency_iso: string;
}

interface GridData {
  year_founded: number;
  description: string;
  logo_url: string;
  share_price: number;
  market_cap: number;
  pe: number | null;
  pb: number | null;
  price_to_sales: number | null;
  analyst_count: number | null;
  return_1d: number | null;
  return_7d: number;
  return_1yr_abs: number;
  price_target: number | null;
  growth_3y: number | null;
  net_income_growth_annual: number | null;
  revenue_growth_annual: number | null;
  dividend_yield: number | null;
  primary_industry: PrimaryIndustry;
  currency_info: CurrencyInfo;
  main_thumb: string;
  main_header: string;
}

interface Grid {
  data: GridData;
}

interface Datum {
  id: number;
  company_id: string;
  trading_item_id: number;
  name: string;
  slug: string;
  exchange_symbol: string;
  ticker_symbol: string;
  unique_symbol: string;
  primary_ticker: boolean;
  last_updated: number;
  canonical_url: string;
  primary_canonical_url: string;
  is_searchable: boolean;
  isin_symbol: string;
  score: Score;
  grid: Grid;
}

interface Meta {
  total_records: number;
  real_total_records: number;
  state: string;
  noResultIfLimit: boolean;
  pe: number;
  return_1yr_abs: number;
  return_7d: number;
}

interface Page {
  data: Datum[];
  meta: Meta;
}

export interface CompanyData {
  pages: Page[];
  pageParams: number[];
}

export interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';

  formatMatcher?: 'best fit' | 'basic';

  hour12?: boolean;

  timeZone?: string;

  // Extensions
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
  formatMatcherFallback?: 'basic' | 'best fit';
}
