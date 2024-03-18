import styled from 'styled-components';
import ListingCard from './ListingCard';
import ListHeader from './ListHeader';
import React from 'react';

interface ListingContainerProps {
  data: unknown;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Adjust the min and max width as needed */
  gap: 24px; /* Adjust the gap between grid items */

  /* Additional styles for responsiveness */
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    ); /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(180px, 1fr)
    ); /* Adjust for mobile screens */
  }
`;

const ListingContainer: React.FC<ListingContainerProps> = ({ data }) => {

  //TODO: to refine
  const content = data?.pages.map((stocks, pageIndex) => (
    <React.Fragment key={pageIndex}>
      {stocks.data.map((data: {
          name: string;
          ticker_symbol: string;
          market_cap: string;
          reporting_currency_symbol: string;
          share_price: string;
          image: string;
       }, stockIndex: number) => (
        // <p key={stockIndex}>{stock.name}</p>
        <ListingCard
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
      ))}
    </React.Fragment>
  ));

  return (
    <>
      <ListHeader />
      <Container>{content}</Container>
    </>
  );
};

export default ListingContainer;
