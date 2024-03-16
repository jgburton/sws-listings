import './App.css';
import ListContainer from './components/listings/ListContainer';
// import ListingCard from './components/listings/ListingCard';

export interface TestData {
  name: string;
}

const MockData: TestData[] = [
  { name: 'Test1' },
  { name: 'Test2' },
  { name: 'Test3' },
  { name: 'Test4' },
  { name: 'Test5' },
  { name: 'Test1' },
  { name: 'Test2' },
  { name: 'Test3' },
  { name: 'Test4' },
  { name: 'Test5' },
  { name: 'Test1' },
  { name: 'Test2' },
  { name: 'Test3' },
  { name: 'Test4' },
  { name: 'Test5' },
];

function App() {
  return (
    <>
      <ListContainer data={MockData} />
    </>
  );
}

export default App;

// TODO:
// 1. Show a list of companies presented in a tile
// 2. Tile that shows the company name (Apple), unique symbol (NasdaqGS:APPL), snowflake score

// 3. Pagination. You can approach this however you want.

// 4. Filtering by country (refer to https://simplywall.st/stocks for supported country list)
// 5. Sorting by market cap (ASC and DESC direction)

// 6. Some form of basic styling. Feel free to use design systems as long as it doesn't have any conflict with the primary criteria (see below).

// Primary criteria:
// Component modelling (How you organise your components into logical groups)
// Styling architecture (How you implement your styles; hand-written styles or design system)
// Rendering performance (Check for performance bottlenecks)
// Avoid overengineering (Simple and straightforward)
// Type-safety. Ensure you have proper type definitions. Prefer inference over explicit types.

// Optional criteria:
// Data structures (How you store internal state)
// Testing practices
// a11y
// i18n readiness
