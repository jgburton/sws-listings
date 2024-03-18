import styled from 'styled-components';
import { roundToNearestBillionOrMillion } from '../../utilities';

interface ListingCardProps {
  name: string;
  ticker_symbol: string;
  market_cap: string;
  reporting_currency_symbol: string;
  share_price: string;
  image: string;
  // innerRef?: React.Ref<HTMLElement>;
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

  position: relative;
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

const LogoCanvas = styled.canvas<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  filter: blur(5px);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

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
  reporting_currency_symbol,
  share_price,
  image,
  // innerRef
}) => {
  const formatted_market_cap = roundToNearestBillionOrMillion(market_cap);

  return (
    <Container key={name}>
      <CompanyInfo>
        <LogoWrapper>
          <p className="stock-name">{name}</p>
          <p className="stock-price">
            {reporting_currency_symbol + formatted_market_cap}
          </p>
        </LogoWrapper>
        <LogoWrapper>
          <LogoCanvas image={image} width="560" height="560" />
        </LogoWrapper>
      </CompanyInfo>
      <CompanyData>
        <StockInfo>
          <div className="StockInfoSummary">
            <p className="title">{ticker_symbol}</p>
            <p className="info">{reporting_currency_symbol + share_price}</p>
          </div>
          <ChangeInfo infoValue={-3.5}>
            <p className="title">7D</p>
            <p className="info">
              <span>-3.5%</span>
              {/* TODO: How to aquire or calculate this? */}
            </p>
          </ChangeInfo>
          <ChangeInfo infoValue={2.3}>
            <p className="title">1Y</p>
            <p className="info">
              <span>2.3%</span>
              {/* TODO: How to aquire or calculate this? */}
            </p>
          </ChangeInfo>
        </StockInfo>
      </CompanyData>
    </Container>
  );
};

export default ListingCard;
