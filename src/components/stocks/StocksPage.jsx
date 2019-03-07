import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import LoadingState from '../common/LoadingState';
import { getOneYearStockChartData } from '../../utils/stocks/stocksUtils';
import StockChartSection from './StockChartSection';
import '../../style/stocks/stocksPage.css';
import { Container } from 'semantic-ui-react';

export default class StocksPage extends PureComponent {

  constructor() {
    super();
    this.state = {
      chartDataByTicker: Map(),
      selectedTicker: null,
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
      getOneYearStockChartData(selectedTicker, this.handleAddStockDataForTicker)
    } else {
      this.setState({
        fetchingChartData: false,
        selectedTicker,
      });
    }
  }

  render() {
    const { selectedTicker } = this.state;
    const stockChartData = this.state.chartDataByTicker.get(this.state.selectedTicker);
    if (!stockChartData || !selectedTicker) {
      return <LoadingState />
    }
    return (
      <Container>
        <StockChartSection 
          ticker={selectedTicker}
          stockChartData={stockChartData}
        />
      </Container>
    );
  }
}