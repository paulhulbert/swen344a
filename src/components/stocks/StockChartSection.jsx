import React from 'react'
import { Segment } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants/colors';
import { StocksChart } from './StocksChart';
import StockInformation from './StockInformation';

export default function StockChartSection({
  ticker,
  stockChartData,
}) {
  return (
    <Segment.Group
      className="stock-chart-segment"
    >
      <Segment
        inverted={true}
        color={PRIMARY_COLOR}
        textAlign="center"
      >
        {ticker}
      </Segment>
      <Segment>
        <StocksChart stockTicker={ticker} stockChartData={stockChartData} />
      </Segment>
      <Segment
        inverted={true}
        color={PRIMARY_COLOR}
      >
        <StockInformation />
      </Segment>
    </Segment.Group>
  )
}