import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Row, Typography, Select, Col } from "antd";
import HTMLReactParser from 'html-react-parser';
import "./tokenIndex.css";
import { LimitOrder, MarketOrder, LineChart } from "./elements";
import millify from "millify";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from './services/cryptoApi';

const {Title} = Typography;
const {Option} = Select;

function TokenDetails() {
  const [timeperiod, setTimeperiod] = useState("7d");
  const { name, uuid } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(uuid)
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId: uuid, timePeriod: timeperiod});
  const cryptoDetails = data?.data?.coin
  const [orderType, setOrderType] =useState("market");
  
  
  
  if(isFetching) return "Loading...";
  console.log(coinHistory)
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  
  return (
    <div className="tokenPage">
      <Row className="coin-stats-card">
      <Title level={2} className="header-item">
        <img src={data?.data?.coin?.iconUrl} className="logo" />
        {data?.data?.coin.name} ({data?.data?.coin.symbol})
      </Title>
        <div className="header-item">USD Price <br />${cryptoDetails?.price && millify(cryptoDetails?.price)}</div>
        <div className="header-item">Max Supply <br />{cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)} {data?.data?.coin.symbol} </div>
        <div className ="header-item">Circulating Supply <br />{cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)} {data?.data?.coin.symbol} </div>
        <div className="header-item">Market Cap <br />{cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}</div>
      </Row>
      
      <Col className="chart-order">
        <Col className="left-column">
          <Row className="chart">
          <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
          </Select>
          <LineChart coinHistory={coinHistory}/>
          </Row>
          <Row className="additional-stats-container">
          <Title level={2} className="stats-header">
            Additional Stats
          </Title>
          <div className="additional-stats">
            <div>All Time high:<br/> {cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}</div>
            <div>Percent Change:<br/> {cryptoDetails?.change}%</div>
            <div>Number of Markets:<br/> {cryptoDetails?.numberOfMarkets}</div>
            <div>Number of Exchanges:<br/> {cryptoDetails?.numberOfExchanges}</div>
            <div>Rank: <br/>{cryptoDetails?.rank}</div>
          </div>
          </Row>
        </Col>

        <Col className="right-column">
        <Row className="card-order">
          <div className="orderChoice">
            <span onClick={() => setOrderType('limit')} className={orderType === 'limit' ? "selected" : "unselected"}>
              Limit Order
            </span>
            <span className={orderType === 'limit' ? "unselected" : "selected"} onClick={() => setOrderType('market')}>
              Market Order
            </span>
          </div>
          {orderType === 'limit' ? <LimitOrder /> : <MarketOrder />}

        </Row>
        <Row className="website-container">
          <Title level={2} className="website-header">
            Description
          </Title>
          <div className="description">
            {HTMLReactParser(cryptoDetails.description)}
          </div>
        </Row>
        <Row className="website-container">
          <Title level={2} className="website-header">
            Website
          </Title>
          <div className="website">
            {cryptoDetails?.websiteUrl}
          </div>
        </Row>
        </Col>
      </Col>
    </div>
  )
}

export default TokenDetails;