import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

export default class StockTickerPicker extends PureComponent {
  renderStockTicker(stock) {
    const ticker = stock.get(STOCK_FIELD_NAMES.SYMBOL);
    return (
      <Menu.Item
        key={ticker}
        name={ticker}
        active={this.props.selectedTicker === ticker}
        onClick={() => this.props.handleSelectTicker(ticker)}
      />
    );
  }

  renderTopStocks() {
    return this.props.topStocks.map(this.renderStockTicker);
  }

  render() {
    return (
      <Menu
        fluid
        vertical
        tabular
      >
        {this.renderTopStocks()}
      </Menu>
    );
  }
}

StockTickerPicker.propTypes = {
  selectedTicker: PropTypes.string.isRequired,
  handleSelectTicker: PropTypes.func.isRequired,
  topStocks: ImmutablePropTypes.list.isRequired,
};
