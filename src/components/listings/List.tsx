import styled from 'styled-components';
import ListingCard from './ListingCard';
import ListHeader from './ListHeader';
import React, { Dispatch } from 'react';
import { SortingOrder } from '../../types';

interface ListingContainerProps {
  data: unknown;
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
  const sortingProps = {
    marketCapSort,
    setMarketCapSort,
    countryName,
    setCountryName,
  };

  // TODO: Refine
  const totalRecords = data?.pages[0].meta.real_total_records;
  const content = data?.pages.map((stocks, pageIndex) => (
    <React.Fragment key={pageIndex}>
      {stocks.data.map(
        (
          data: {
            name: string;
            ticker_symbol: string;
            market_cap: string;
            reporting_currency_symbol: string;
            share_price: string;
            image: string;
          },
          stockIndex: number
        ) => {
          return (
            <ListingCard
              innerRef={innerRef}
              key={stockIndex}
              name={data.name}
              ticker_symbol={data.ticker_symbol}
              market_cap={data.grid.data.market_cap}
              reporting_currency_symbol={
                data.grid.data.currency_info.reporting_currency_symbol
              }
              share_price={data.grid.data.share_price}
              image={data.grid.data.main_thumb}
            />
          );
        }
      )}
    </React.Fragment>
  ));

  return (
    <>
      <ListHeader totalRecords={totalRecords} {...sortingProps} />
      <Container>{content}</Container>
    </>
  );
};

export default ListingContainer;
