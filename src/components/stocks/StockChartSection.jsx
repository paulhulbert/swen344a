import React, { PureComponent } from 'react'
import { Segment } from 'semantic-ui-react';
import { PRIMARY_COLOR } from '../../constants/colors';
import { StocksChart } from './StocksChart';
import StockInformation from './StockInformation';
import ChartTypePicker from './ChartTypePicker';
import { formatOneYearDataToChartType } from '../../utils/stocks/stocksUtils';
import { CHART_TYPES } from '../../constants/stockChartConstants';

export default class StockChartSection extends PureComponent {

  constructor() {
    super()
    this.state = {
      activeChartType: CHART_TYPES.FIVE_DAY,
    };
    this.handleSelectChartType = this.handleSelectChartType.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  handleSelectChartType(chartType) {
    this.setState({
      activeChartType: chartType
    });
  }

  getChartData() {
    return formatOneYearDataToChartType(this.props.stockChartData, this.state.activeChartType);
  }

  render() {
    const { ticker } = this.props;
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
          <ChartTypePicker
            activeChartType={this.state.activeChartType}
            handleClickChartType={this.handleSelectChartType}
          />
          <StocksChart stockTicker={ticker} stockChartData={this.getChartData()} />
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
}