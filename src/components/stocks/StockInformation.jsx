import React from 'react';
import { Header, List } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import {
  STOCK_FIELD_NAMES
} from '../../constants/stocksConstants';
import { formatStockValue } from '../../utils/stocks/stocksUtils';

const STOCK_FIELD_LABELS = fromJS([
  { 
    label: 'Previous Close',
    field: STOCK_FIELD_NAMES.CLOSE_PRICE
  },
  { 
    label: 'Open',
    field: STOCK_FIELD_NAMES.OPEN_PRICE
  },
  { 
    label: 'Day High',
    field: STOCK_FIELD_NAMES.DAY_HIGH
  },
  { 
    label: 'Day Low',
    field: STOCK_FIELD_NAMES.DAY_LOW
  },
  { 
    label: '52 Week High',
    field: STOCK_FIELD_NAMES.YEAR_HIGH
  },
  { 
    label: '52 Week Low',
    field: STOCK_FIELD_NAMES.YEAR_LOW
  },
]);

function renderStockField(stock, fieldData) {
  const fieldKey = fieldData.get('field');
  return (
    <List.Item key={fieldKey}>
      <Header
        sub={true}
        inverted={true}
        className="stock-information-item"
      >
        {fieldData.get('label')}
      </Header>
      <span>{formatStockValue(stock.get(fieldKey))}</span>
    </List.Item>
  )
}

function renderStockFields(stock) {
  return (
    <List
      inverted={true}
      horizontal={true}
      relaxed={true}
    >
      {STOCK_FIELD_LABELS.map(fieldData => renderStockField(stock, fieldData))}
    </List>
  )
}

export default function StockInformation({
  stockData,
}) {
  return (
    <div>
      <Header as="h4" inverted={true}>
        {stockData.get(STOCK_FIELD_NAMES.SYMBOL)} - {stockData.get(STOCK_FIELD_NAMES.COMPANY_NAME)}
        <Header.Subheader> {formatStockValue(stockData.get(STOCK_FIELD_NAMES.PRICE))} </Header.Subheader>
      </Header>
      {renderStockFields(stockData)}
    </div>
  )
}