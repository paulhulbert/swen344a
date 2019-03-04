import React from 'react';
import { Card, List, Header, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';

export default function StocksCard({stockData}){
    return(
        <Card
            fluid={true}
        >
            <Card.Content>
                <Card.Header>
                    {stockData.get(STOCK_FIELD_NAMES.SYMBOL)}
                </Card.Header>
                <Card.Meta>
                    {stockData.get(STOCK_FIELD_NAMES.COMPANY_NAME)}
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}

StocksCard.propTypes = {
    stockData: ImmutablePropTypes.map.isRequired
  }