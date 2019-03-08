import React from 'react';
import {
  Card, List, Header, Icon,
} from 'semantic-ui-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

function calculateNetChange(stockData) {
  return stockData.get(STOCK_FIELD_NAMES.PRICE) - stockData.get(STOCK_FIELD_NAMES.OPEN_PRICE);
}

function getIconProps(netChange) {
  if (netChange > 0) {
    return {
      color: 'green',
      name: 'arrow circle up',
    };
  }
  if (netChange < 0) {
    return {
      color: 'red',
      name: 'arrow circle down',
    };
  }
  return {
    color: 'gray',
    name: 'circle',
  };
}

function renderPriceAndNetChange(price, netChange) {
  return (
    <List
      horizontal
    >
      <List.Item>
        <Header
          sub
        >
            $
          {price}
        </Header>
      </List.Item>
      <List.Item>
        <Header
          sub
        >
          <Icon {...getIconProps(netChange)} />
        </Header>
      </List.Item>
    </List>
  );
}

export default function StocksCard({ stockData }) {
  const netChange = calculateNetChange(stockData);
  return (
    <Card
      fluid
      color={getIconProps(netChange).color}
    >
      <Card.Content>
        <Card.Header>
          {stockData.get(STOCK_FIELD_NAMES.SYMBOL)}
        </Card.Header>
        <Card.Meta>
          {stockData.get(STOCK_FIELD_NAMES.COMPANY_NAME)}
        </Card.Meta>
        <Card.Description>
          {renderPriceAndNetChange(stockData.get(STOCK_FIELD_NAMES.PRICE), netChange)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>
                    0 Shares
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

StocksCard.propTypes = {
  stockData: ImmutablePropTypes.map.isRequired,
};
