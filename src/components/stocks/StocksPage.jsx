import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import LoadingState from '../common/LoadingState';
import { getOneYearStockChartData, fetchTopStocks } from '../../utils/stocks/stocksUtils';
import StockChartSection from './StockChartSection';
import { Container, Grid } from 'semantic-ui-react';
import StockTickerPicker from './StockTickerPicker';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

export default class StocksPage extends PureComponent {

  constructor() {
    super();
    this.state = {
      chartDataByTicker: Map(),
      topStocks: null,
      selectedTicker: null,
      fetchingChartData: false,
      firstChartLoaded: false,
    }
    this.handleAddStockChartDataForTicker = this.handleAddStockChartDataForTicker.bind(this);
    this.handleAddTopStocks = this.handleAddTopStocks.bind(this);
    this.handleSelectTicker = this.handleSelectTicker.bind(this);
  }

  componentDidMount() {
    fetchTopStocks(this.handleAddTopStocks);
  }  

  handleAddStockChartDataForTicker(ticker, stockData) {
    this.setState({
      chartDataByTicker: this.state.chartDataByTicker.set(ticker, stockData),
      fetchingChartData: false,
      firstChartLoaded: true,
    });
  }

  handleAddTopStocks(topStocks) {
    this.setState({
      topStocks,
    });
    this.handleSelectTicker(topStocks.first().get(STOCK_FIELD_NAMES.SYMBOL));
  }

  handleSelectTicker(selectedTicker) {
    if (selectedTicker && !this.state.chartDataByTicker.get(selectedTicker)) {
      this.setState({
        fetchingChartData: true,
        selectedTicker,
      });
      getOneYearStockChartData(selectedTicker, this.handleAddStockChartDataForTicker)
    } else {
      this.setState({
        fetchingChartData: false,
        selectedTicker,
      });
    }
  }

  render() {
    const { selectedTicker, topStocks } = this.state;
    const stockChartData = this.state.chartDataByTicker.get(this.state.selectedTicker);
    if (!topStocks || !selectedTicker || !this.state.firstChartLoaded) {
      return <LoadingState />
    }
    return (
      <Container>
        <Grid columns={2} stretched={true}>
          <Grid.Column width={2}>
            <StockTickerPicker
              selectedTicker={selectedTicker}
              handleSelectTicker={this.handleSelectTicker}
              topStocks={topStocks.toList()}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <StockChartSection
              ticker={selectedTicker}
              stockChartData={stockChartData}
              selectedStock={topStocks.get(selectedTicker)}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}