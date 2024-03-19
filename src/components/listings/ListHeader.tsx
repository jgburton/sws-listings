import styled from 'styled-components';
import { SortingOrder } from '../../types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import SortSelect from '../inputs/SortSelect';
import CountrySelect from '../inputs/CountrySelect';

interface ListHeaderProps {
  marketCapSort: SortingOrder;
  setMarketCapSort: Dispatch<React.SetStateAction<SortingOrder>>;
  countryName: string;
  setCountryName: Dispatch<React.SetStateAction<string>>;
  totalRecords: string;
}

const HeaderContainer = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;

  .container {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }
  .column {
    flex: 1;
  }
  .center {
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    .container {
      flex-direction: column;
    }
    .column {
      flex: none;
      width: 100%;
      margin-bottom: 10px;
    }
    .center {
      text-align: left;
    }
  }
`;

const Header = styled.h1`
  padding: 0px;
  margin: 0px;
  font-size: 2.4rem;
  line-height: 1.25;
  font-weight: 500;
  color: rgb(255, 255, 255);
  margin-bottom: 8px;
`;

const DateText = styled.p`
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5;
  color: rgb(255, 255, 255);
  span {
    opacity: 0.7;
  }
`;

const BodyText = styled.p<{ small?: boolean }>`
  margin: 0px;
  font-weight: normal;
  font-size: ${(props) => (props.small ? '0.8rem' : '1rem')};
  line-height: 1.5;
  color: ${(props) =>
    props.small ? 'rgba(255, 255, 255, 0.3);' : 'rgba(255, 255, 255, 0.5);'};
`;

const filterOptions = [
  { value: SortingOrder.DESC, label: 'Market Cap High to Low' },
  { value: SortingOrder.ASC, label: 'Market Cap Low to High' },
];

const ListHeader: React.FC<ListHeaderProps> = ({
  // marketCapSort,
  setMarketCapSort,
  countryName,
  setCountryName,
  totalRecords,
}) => {
  //TODO: could be improved
  const handleMarketCapSortChange = (selectedOption: {
    value: SetStateAction<SortingOrder>;
  }) => {
    if (selectedOption.toString() == 'asc') {
      setMarketCapSort(SortingOrder.ASC);
    } else {
      setMarketCapSort(SortingOrder.DESC);
    }
  };

  const handleCountryFilter = (value: string) => {
    setCountryName(value);
  };

  return (
    <HeaderContainer>
      {/* <p>
        <span>CA Market ^</span>&nbsp; &nbsp; <span>Industry ^</span>
      </p> */}
      <CountrySelect
        onChange={(value) => handleCountryFilter(value.value)}
        value={countryName}
      />
      <Header>Largest Canadian (TSX) Stocks by Market Cap</Header>
      <DateText>
        <span>UPDATED</span> Mar 16, 2024
      </DateText>
      <BodyText>
        Discover large cap Canadian companies that are on the TSX. These
        companies are organised by Market Cap.
      </BodyText>
      <div className="container">
        <div className="column">
          {' '}
          <SortSelect
            options={filterOptions}
            onChange={handleMarketCapSortChange}
          />
        </div>
        <div className="column center">
          <BodyText small>{`${totalRecords} companies`}</BodyText>
        </div>
        <div className="column"></div>
      </div>
    </HeaderContainer>
  );
};

export default ListHeader;

// TODO:
// 1. Implement dropdowns
// 2. consume data with interface and props etc
