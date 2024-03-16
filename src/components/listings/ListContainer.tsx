import styled from 'styled-components';

import { TestData } from '../../App';
import ListingCard from './ListingCard';

interface ListingContainerProps {
  data: TestData[];
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
  const listItems = data.map(({ name }) => <ListingCard name={name} />);

  return <Container>{listItems}</Container>;
};

export default ListingContainer;
