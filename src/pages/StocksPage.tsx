import { useEffect, useState } from 'react';
import { fetchStocks } from '../api/stocks/api';
import ListContainer from '../components/listings/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { SortingOrder } from '../types';
import SnowFlake from '../components/listings/SnowFlake';

const StocksPage = () => {
  const [marketCapSort, setMarketCapSort] = useState<SortingOrder>(
    SortingOrder.DESC
  );
  const [countryName, setCountryName] = useState<string>('CA');

  const sortingProps = {
    marketCapSort,
    setMarketCapSort,
    countryName,
    setCountryName,
  };

  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['stocks'],
    queryFn: ({ pageParam }) =>
      fetchStocks({
        pageParam,
        marketCapSort: marketCapSort,
        countryName: countryName,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const hasMoreData = lastPage.data.length > 0;

      return hasMoreData ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    refetch({
      throwOnError: false,
      force: true,
      queryKey: ['stocks', { marketCapSort, countryName }],
    });
  }, [refetch, marketCapSort, countryName]);

  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  const testData = [0,3,3,2,5];
  const testData2 = [5,5,4,3,0];
  const testData3 = [0,0,0,0,0];
const titles = ['Value', 'Future', 'Past', 'Health', 'Dividend'];

  return (
    <>
      {/* <ListContainer innerRef={ref} data={data} {...sortingProps} /> */}
      {/* {isFetchingNextPage && <p>Loading...</p>} */}
      <SnowFlake data={testData} titles={titles}/>
      <SnowFlake data={testData2} titles={titles}/>
      <SnowFlake data={testData3} titles={titles}/>
    </>
  );
};

export default StocksPage;

// TODO: post run
// 1. Move above logic etc to stocks page - DONE
// 2.Tidy up code - DONE
// 3. Ensure the ref is the last item not a p tag - DONE
// 5. Implement filter by market cap api integration - DONE

// 4. Find out how many pages there are and why this breaks with the commented out logic - DONE
// 6. Implement filter by country ui & api integration
// 5. Data visulisation shapes ?
