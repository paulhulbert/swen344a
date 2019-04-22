import React from 'react';
import { Menu } from 'semantic-ui-react';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

function renderStockTicker(selectedTicker, ticker, handleSelectTicker) {
  return (
    <Menu.Item
      key={ticker}
      name={ticker}
      active={selectedTicker === ticker}
      onClick={() => handleSelectTicker(ticker)}
    />
  )
}

function renderTopStocks(selectedTicker, topStocks, handleSelectTicker) {
  return topStocks.map((stock) => renderStockTicker(selectedTicker, stock.get(STOCK_FIELD_NAMES.SYMBOL), handleSelectTicker));
}

export default function StockTickerPicker({
  selectedTicker,
  handleSelectTicker,
  topStocks,
}) {
  return (
    <Menu
      fluid={true}
      vertical={true}
      tabular={true}
    >
      {renderTopStocks(selectedTicker, topStocks, handleSelectTicker)}
    </Menu>
  )
}