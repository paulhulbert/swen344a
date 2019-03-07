import React, { PureComponent } from 'react';
import { StocksChart } from './StocksChart';
import { Map } from 'immutable';
import LoadingState from '../common/LoadingState';
import { fetchOneYearStockChartData } from '../../utils/stocks/stocksUtils';

export default class StocksPage extends PureComponent {

  constructor() {
    super();
    this.state = {
      chartDataByTicker: Map(),
      selectedTicker: 'AAPL',
      fetchingChartData: false,
    }
    this.handleAddStockDataForTicker = this.handleAddStockDataForTicker.bind(this);
    this.handleSelectTicker = this.handleSelectTicker.bind(this);
  }

  componentDidMount() {
    this.handleSelectTicker('AAPL');
  }

  handleAddStockDataForTicker(ticker, stockData) {
    this.setState({
      chartDataByTicker: this.state.chartDataByTicker.set(ticker, stockData),
    })
  }

  handleSelectTicker(selectedTicker) {
    if (selectedTicker && !this.state.chartDataByTicker.get(selectedTicker) && !this.state.fetchingChartData) {
      this.setState({
        fetchingChartData: true,
        selectedTicker,
      });
      fetchOneYearStockChartData(selectedTicker, this.handleAddStockDataForTicker)
    } else {
      this.setState({
        fetchingChartData: false,
        selectedTicker,
      });
    }
  }

  render() {
    const stockChartData = this.state.chartDataByTicker.get(this.state.selectedTicker);
    if (!stockChartData) {
      return <LoadingState />
    }
    return (
      <StocksChart stockTicker="AAPL" stockChartData={stockChartData}/>
    );
  }
}