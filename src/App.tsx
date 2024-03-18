import React, { useEffect } from 'react';
import './App.css';
import { fetchStocks } from './api/stocks/api';
import ListContainer from './components/listings/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';


function App() {
  const { ref, inView } = useInView();
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log({lastPage, allPages});
      return allPages.length + 1 ;
      // const nextPage = lastPage.length ? allPages.length : undefined;
      // console.log({nextPage});
      // return nextPage; TODO: Bug
    }
  });

  useEffect(() => {
    if(inView && hasNextPage){
      // console.log('Fire');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <>
      {!isLoading && !isError && <ListContainer data={data} /> }
      {/* <button ref={ref} style={{margin: '1rem 0'}}disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'Nothing more to load'}</button> */}
      {isFetchingNextPage ? <p>Loading...</p> :  <p ref={ref} >More stocks...</p>}
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
