import styled from 'styled-components';
import {
  ScoreData,
  createUsefulScoreData,
  roundToNearestMillionOrBillion,
} from '../../utilities';
import SnowFlake from './SnowFlake';

interface ListingCardProps {
  name: string;
  tickerSymbol: string;
  marketCap: string;
  reportingCurrencySymbol: string;
  sharePrice: string;
  image: string;
  innerRef: React.Ref<HTMLDivElement>;
  scoreData: ScoreData;
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

const CenteredDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* Translate it back by 50% of its own width and height */
`;

const ChangeInfo = styled.div<{ infovalue: number }>`
  margin-right: 20px;

  span {
    color: ${(props) => (props.infovalue > 0 ? 'green' : 'red')};
  }
`;

const ListingCard: React.FC<ListingCardProps> = ({
  name,
  tickerSymbol,
  marketCap,
  reportingCurrencySymbol,
  sharePrice,
  image,
  innerRef,
  scoreData,
}) => {
  const formattedMarketCap = roundToNearestMillionOrBillion(marketCap);
  const usefulScoreData = createUsefulScoreData(scoreData);

  return (
    <Container ref={innerRef} key={name}>
      <CompanyInfo>
        <LogoWrapper>
          <p className="stock-name">{name}</p>
          <p className="stock-price">
            {`${reportingCurrencySymbol}${formattedMarketCap}`}
          </p>
        </LogoWrapper>
        <LogoWrapper>
          <LogoCanvas image={image} width="560" height="560" />
        </LogoWrapper>
        <CenteredDiv>
          {/* <SnowFlake data={testData} titles={titles}/> */}
          <SnowFlake data={usefulScoreData} />
        </CenteredDiv>
      </CompanyInfo>
      <CompanyData>
        <StockInfo>
          <div className="StockInfoSummary">
            <p className="title">{tickerSymbol}</p>
            <p className="info">{`${reportingCurrencySymbol}${sharePrice}`}</p>
          </div>
          <ChangeInfo infovalue={-3.5}>
            <p className="title">7D</p>
            <p className="info">
              <span>-3.5%</span>
              {/* TODO: How to aquire or calculate this? */}
            </p>
          </ChangeInfo>
          <ChangeInfo infovalue={2.3}>
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
