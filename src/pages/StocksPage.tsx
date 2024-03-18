import { useEffect } from 'react';
import { fetchStocks } from '../api/stocks/api';
import ListContainer from '../components/listings/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const StocksPage = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log({lastPage, allPages});
      return allPages.length + 1;
      // const nextPage = lastPage.length ? allPages.length : undefined;
      // console.log({nextPage});
      // return nextPage; TODO: Bug
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {!isLoading && !isError && <ListContainer innerRef={ref} data={data} />}
      {isFetchingNextPage && <p>Loading...</p>}
    </>
  );
};

export default StocksPage;

// TODO: post run
// 1. Move above logic etc to stocks page - DONE
// 2.Tidy up code - DONE
// 3. Ensure the ref is the last item not a p tag - DONE

// 4. Find out how many pages there are and why this breaks with the commented out logic

// 5. Implement filter by market cap api integration
// 6. Implement filter by country ui & api integration
