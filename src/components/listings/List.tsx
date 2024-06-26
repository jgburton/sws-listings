import styled from 'styled-components';
import ListingCard from './ListingCard';
import ListHeader from './ListHeader';
import React, { Dispatch, useMemo } from 'react';
import { CompanyData, SortingOrder } from '../../types';

interface ListingContainerProps {
  data: CompanyData;
  innerRef: React.Ref<HTMLDivElement>;
  marketCapSort: SortingOrder;
  setMarketCapSort: Dispatch<React.SetStateAction<SortingOrder>>;
  countryName: string;
  setCountryName: Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

const ListingContainer: React.FC<ListingContainerProps> = ({
  data,
  innerRef,
  marketCapSort,
  setMarketCapSort,
  countryName,
  setCountryName,
}) => {
  const sortingProps = useMemo(
    () => ({
      marketCapSort,
      setMarketCapSort,
      countryName,
      setCountryName,
    }),
    [marketCapSort, setMarketCapSort, countryName, setCountryName]
  );

  const totalRecords = useMemo(
    () => data?.pages[0]?.meta.real_total_records || 0,
    [data]
  );

  const exchangeSymbol = useMemo(
    () => data?.pages[0]?.data[0]?.exchange_symbol || '',
    [data]
  );

  const content = useMemo(() => {
    if (!data) return null;
    return data.pages.flatMap((stocks) =>
      stocks.data.map((data, index) => {
        return (
          <ListingCard
            innerRef={index >= stocks.data.length - 12 ? innerRef : null}
            key={data.id}
            name={data.name}
            tickerSymbol={data.ticker_symbol}
            marketCap={data.grid?.data?.market_cap}
            reportingCurrencySymbol={
              data.grid?.data?.currency_info?.reporting_currency_symbol
            }
            sharePrice={data.grid?.data?.share_price}
            image={data.grid?.data?.main_thumb}
            scoreData={data.score?.data}
          />
        );
      })
    );
  }, [data, innerRef]);

  return (
    <>
      <ListHeader
        exchangeSymbol={exchangeSymbol}
        totalRecords={totalRecords}
        {...sortingProps}
      />
      <Container>{content}</Container>
    </>
  );
};

export default ListingContainer;
