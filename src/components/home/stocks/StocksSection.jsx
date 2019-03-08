import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import LoadingState from '../../common/LoadingState';
import StocksCard from '../../stocks/StocksCard';
import { fetchTopStocks } from '../../../utils/stocks/stocksUtils';
import { STOCK_FIELD_NAMES } from '../../../constants/stocksConstants';
import '../../../style/home/stocksSection.css';

export default class StocksSection extends PureComponent {
  constructor() {
    super();
    this.state = {
      fetchingStocks: true,
      stocks: Map(),
    };
    this.handleUpdateStocks = this.handleUpdateStocks.bind(this);
  }


  componentDidMount() {
    fetchTopStocks(this.handleUpdateStocks);
  }

  handleUpdateStocks(stocks) {
    this.setState({
      fetchingStocks: false,
      stocks,
    });
  }

  renderIndividualStock(stock) {
    return (
      <div key={stock.get(STOCK_FIELD_NAMES.SYMBOL)} className="stock-card">
        <StocksCard
          stockData={stock}
        />
      </div>
    );
  }

  render() {
    if (this.state.fetchingStocks) {
      return <LoadingState />;
    }
    return this.state.stocks.toList().map(this.renderIndividualStock);
  }
}
