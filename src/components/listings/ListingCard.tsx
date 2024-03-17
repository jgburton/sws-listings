import styled from 'styled-components';
import { roundToNearestBillionOrMillion } from '../../utilities';

interface ListingCardProps {
  name: string;
  ticker_symbol: string;
  market_cap: string;
}

const Container = styled.div`
  height: 310px;
  border-radius: 8px;
  box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  cursor: pointer;
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 1rem;

  p {
    margin: 0px;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoWrapper = styled.div`
  .stock-name {
    color: rgb(255, 255, 255);
    font-size: 16px;
  }
  .stock-price {
    font-size: 13px;
    opacity: 0.7;
  }
`;

// const LogoCanvas = styled.canvas`

// `;

const CompanyData = styled.div``;

const StockInfo = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 1rem;

  .StockInfoSummary {
    margin-right: 40px;
  }
  .title {
    font-size: 11px;
    opacity: 0.7;
  }
  .info {
    font-size: 13px;
  }
`;

const ChangeInfo = styled.div<{ infoValue: number }>`
  margin-right: 20px;

  span {
    color: ${(props) => (props.infoValue > 0 ? 'green' : 'red')};
  }
`;

const ListingCard: React.FC<ListingCardProps> = ({
  name,
  ticker_symbol,
  market_cap,
}) => {

const formatted_market_cap = roundToNearestBillionOrMillion(market_cap);

  return (
    <Container key={name}>
      <CompanyInfo>
        <LogoWrapper>
          <p className="stock-name">{name}</p>
          {/* <p className="stock-price">AU$214.9b</p> */}
          <p className="stock-price">{"CA$" +formatted_market_cap}</p> 
          {/* //TODO: currency prefix should be dynamic */}
          {/* TODO: this needs to be parsed to get currency */}
        </LogoWrapper>
        <LogoWrapper className="sc-lllnCg iqDMY">
          {/* <LogoCanvas width="560" height="560" /> */}
        </LogoWrapper>
      </CompanyInfo>
      <CompanyData>
        <StockInfo>
          <div className="StockInfoSummary">
            <p className="title">{ticker_symbol}</p>
            <p className="info">AU$42.41</p>
          </div>
          <ChangeInfo infoValue={-3.5}>
            <p className="title">7D</p>
            <p className="info">
              <span>-3.5%</span>
            </p>
          </ChangeInfo>
          <ChangeInfo infoValue={2.3}>
            <p className="title">1Y</p>
            <p className="info">
              <span>2.3%</span>
            </p>
          </ChangeInfo>
        </StockInfo>
      </CompanyData>
    </Container>
  );
};

export default ListingCard;
