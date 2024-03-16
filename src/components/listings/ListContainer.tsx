import styled from 'styled-components';
import ListingCard from './ListingCard';

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
  const listItems = data['data'].map(
    (data: { name: string; ticker_symbol: string; market_cap: string }) => (
      <ListingCard
        name={data.name}
        ticker_symbol={data.ticker_symbol}
        market_cap={data.grid.data.market_cap}
      />
    )
  );

  console.log(data['data']);

  return <Container>{listItems}</Container>;
};

export default ListingContainer;
