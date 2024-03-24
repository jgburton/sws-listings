import './App.css';
import StocksPage from './pages/StocksPage';

function App() {
  return <StocksPage />;
}

export default App;

// TODO:
// 1. Show a list of companies presented in a tile - DONE
// 2. Tile that shows the company name (Apple), unique symbol (NasdaqGS:APPL), - DONE  snowflake score - DONE
// 3. Pagination. You can approach this however you want. - DONE
// 4. Filtering by country (refer to https://simplywall.st/stocks for supported country list) - DONE
// 5. Sorting by market cap (ASC and DESC direction) - DONE
// 6. Some form of basic styling. Feel free to use design systems as long as it doesn't have any conflict with the primary criteria (see below). - DONE

// Primary criteria:
// Component modelling (How you organise your components into logical groups)
// Styling architecture (How you implement your styles; hand-written styles or design system)
// Rendering performance (Check for performance bottlenecks)
// Avoid overengineering (Simple and straightforward)
// Type-safety. Ensure you have proper type definitions. Prefer inference over explicit types.

// Optional criteria:
// Data structures (How you store internal state)
// Testing practices - TODO:
// a11y - TODO:
// i18n readiness - TODO:


// TODO: Post Feedback
// Fix all errors (10 errors, 5 files) - TODO:

// 1  src/components/listings/List.tsx:47
// 1  src/components/listings/ListHeader.tsx:3
// 5  src/components/listings/SnowFlake.tsx:57
// 1  src/pages/StocksPage.tsx:51
// 2  src/utilities/index.tsx:19
