import { useEffect, useState } from 'react';
import { fetchStocks } from '../api/stocks/api';
import ListContainer from '../components/listings/List';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { CompanyData, SortingOrder } from '../types';

const StocksPage = () => {
  const [marketCapSort, setMarketCapSort] = useState<SortingOrder>(
    SortingOrder.DESC
  );
  const [countryName, setCountryName] = useState<string>('CA'); // temporary, perhaps nice to use geolocation

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

  return (
    <>
      <ListContainer innerRef={ref} data={data as CompanyData} {...sortingProps} />
      {isFetchingNextPage && <p>Loading...</p>}
    </>
  );
};

export default StocksPage;
