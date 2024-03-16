import './App.css';
import ListContainer from './components/listings/ListContainer';
import { useQuery } from '@tanstack/react-query';

const fetchStocks = async () => {
  const response = await fetch(
    'https://simplywall.st/api/grid/filter?include=grid,score',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        sws: 'fe-challenge',
      },
      body: JSON.stringify({
        id: 1,
        no_result_if_limit: false,
        offset: 0,
        size: 12,
        state: 'read',
        rules: [
          ['order_by', 'market_cap', 'desc'],
          ['grid_visible_flag', '=', true],
          ['market_cap', 'is_not_null'],
          ['primary_flag', '=', true],
          ['is_fund', '=', false],
          ['aor', [['country_name', 'in', ['ca']]]],
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

function App() {
  const { data, isLoading, isError } = useQuery<unknown, Error>({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <ListContainer data={data} />
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
