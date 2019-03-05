import React from 'react';
import { Card, List, Header, Icon, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

function calculateNetChange(stockData){
    return stockData.get(STOCK_FIELD_NAMES.PRICE) - stockData.get(STOCK_FIELD_NAMES.OPEN_PRICE);
}

function getIconColor(netChange){
    if (netChange > 0){
        return 'green';
    }
    else if (netChange < 0){
        return 'red';
    }
    else{
        return 'gray';
    }
}

function getNetChangeIconName(netChange){
    if (netChange > 0){
        return 'arrow circle up';
    }
    else if (netChange < 0){
        return 'arrow circle down';
    }
    else{
        return 'cirlce';
    }
}

function renderPriceAndNetChange(price, netChange) {
    return (
      <List
        horizontal={true}
      >
        <List.Item>
          <Header
            sub={true}
          >
            ${price}
          </Header>
        </List.Item>
        <List.Item>
          <Header
            sub={true}
          >
            <Icon name={getNetChangeIconName(netChange)} color={getIconColor(netChange)}/>
          </Header>
        </List.Item>
      </List>
    )
  }

export default function StocksCard({stockData}){
    return(
        <Card
            fluid={true}
            color={getIconColor(calculateNetChange(stockData))}
        >
            <Card.Content>
                <Card.Header>
                    {stockData.get(STOCK_FIELD_NAMES.SYMBOL)}
                </Card.Header>
                <Card.Meta>
                    {stockData.get(STOCK_FIELD_NAMES.COMPANY_NAME)}
                </Card.Meta>
                <Card.Description>
                    {renderPriceAndNetChange(stockData.get(STOCK_FIELD_NAMES.PRICE), calculateNetChange(stockData))}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta>
                    0 Shares
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

StocksCard.propTypes = {
    stockData: ImmutablePropTypes.map.isRequired
  }