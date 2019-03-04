import React, { PureComponent } from 'react';
import LoadingState from '../../common/LoadingState';
import StocksCard from '../../stocks/StocksCard';
import { Map } from 'immutable';
import { fetchStocks } from '../../../utils/stocks/stocksUtils';


export default class StocksSection extends PureComponent{

    constructor(){
        super();
        this.state = {
            fetchingStocks : true,
            stocks: Map(),
        }
        this.handleUpdateStocks = this.handleUpdateStocks.bind(this);
        this.renderIndividualStock = this.renderIndividualStock.bind(this);
    }


    componentDidMount(){
        fetchStocks(this.handleUpdateStocks);
    }

    handleUpdateStocks(stocks){
        this.setState({
            fetchingStocks : false,
            stocks,
          });
    }

    renderIndividualStock(stock){
        return (
            <div>
                <StocksCard
                    stockData = {stock}
                />
            </div>
        );
    }

    render(){
        if (this.state.fetchingStocks) {
            return <LoadingState />;
          }
        return this.state.stocks.map(this.renderIndividualStock);
    }
}