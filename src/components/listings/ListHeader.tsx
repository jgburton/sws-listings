import styled from 'styled-components';
import Dropdown from '../inputs/DropDown';

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

// TODO: Temp
const options = [
  { value: 'option1', label: 'Market Cap High to Low' },
  { value: 'option2', label: 'Market Cap Low to High' },
];

const ListHeader = () => {
  return (
    <HeaderContainer>
      <p>
        <span>CA Market ^</span>&nbsp; &nbsp; <span>Industry ^</span>
      </p>
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
          <Dropdown options={options} />
        </div>
        <div className="column center">
          <BodyText small>3,310 companies</BodyText>
        </div>
        <div className="column"></div>
      </div>
    </HeaderContainer>
  );
};

export default ListHeader;

// TODO:
// 1. Style titles - DONE
// 2. Style HR - DONE
// 3. Set up actual layout - DONE

// 4. Implement dropdowns
// 5. consume data with interface and props etc
