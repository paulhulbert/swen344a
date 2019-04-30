import React, { PureComponent } from 'react';
import {List, fromJS, Map } from 'immutable';
import LoadingState from '../common/LoadingState';
import { fetchIndividualStockData } from '../../utils/stocks/stocksUtils';
import StockChartSection from './StockChartSection';
import { Container, Grid, Button, Input, Label, Card, Sticky } from 'semantic-ui-react';
import StockTickerPicker from './StockTickerPicker';
import { STOCK_FIELD_NAMES } from '../../constants/stocksConstants';
import firebase from 'firebase';
import 'firebase/database';

export default class StockTradingPage extends PureComponent {

  constructor() {
    super();
    this.state = {
      searchTicker: null,
      ticker: null,
      shares: null,
      history: List(),
      stockData: Map(),
      fetchingStockData : true
    }
    this.handleUpdateStockSearch = this.handleUpdateStockSearch.bind(this);
    this.handleUpdateShares = this.handleUpdateShares.bind(this);
    this.purchaseStock = this.purchaseStock.bind(this);
    this.sellStock = this.sellStock.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
    this.handleGetUserHistory = this.handleGetUserHistory.bind(this);
    this.handleFetchStockDataPurchase = this.handleFetchStockDataPurchase.bind(this);
    this.handleFetchStockDataSold = this.handleFetchStockDataSold.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
  }

  handleGetUserHistory() {
    if (firebase.auth().currentUser) {
      firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid).once('value').then((response) => {
        this.setState({
            history: response.val()? fromJS(response.val().stocks) : List(),
          })
        });
    } else {
      setTimeout(this.handleGetUserHistory, 500)
    }
  }

  componentDidMount() {
    this.handleGetUserHistory();
  }

  handleUpdateStockSearch(event) {
    const searchTicker = event.target.value;
    this.setState({
        searchTicker,
    })
  }

  handleUpdateShares(){
    const shares = event.target.value;
    console.log(shares);
    console.log(Number.isInteger(+shares));
    if (!Number.isInteger(+shares)){
        event.target.value = shares.slice(0, -1);
    }
    else{
        this.setState({
            shares,
        })
    }
  }

  purchaseStock() {
    fetchIndividualStockData(this.state.searchTicker, this.handleFetchStockDataPurchase);
  }

  handleFetchStockDataPurchase(stockData){
    try {
        firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid + "/stocks/").push({
            ticker : this.state.searchTicker,
            shares : this.state.shares,
            price : stockData.get(this.state.searchTicker).get(STOCK_FIELD_NAMES.PRICE),
            type : 'Purchase',
            date : Date.now()
        });
        this.handleGetUserHistory();
      } catch (error) {
        window.alert('That is not a valid ticker symbol.');   
      }
  }

  sellStock() {
    fetchIndividualStockData(this.state.searchTicker, this.handleFetchStockDataSold);
  }

  handleFetchStockDataSold(stockData){
      try {
        firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid + "/stocks/").push({
            ticker : this.state.searchTicker,
            shares : this.state.shares,
            price : stockData.get(this.state.searchTicker).get(STOCK_FIELD_NAMES.PRICE),
            type : 'Sold',
            date : Date.now()
        });
        this.handleGetUserHistory();
      } catch (error) {
        window.alert('That is not a valid ticker symbol.');   
      }
  }

  renderHistory(historyData){
      const date = new Date(historyData.get('date'));
    return(
        <div key={historyData.get('date')} className="purchase=history">
            <Card
                fluid={true}
            >
                <Card.Content>
                    <Card.Header>
                        {historyData.get('ticker')}
                    </Card.Header>
                    <Card.Meta>
                        {historyData.get('type')}
                    </Card.Meta>
                    <Card.Description>
                        {historyData.get('shares')} shares at {historyData.get('price')}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Card.Meta>
                    Bought on {date.toString()}
                </Card.Meta>
            </Card.Content>
            </Card>
        </div>
    )
  }

  deleteHistory(){
    firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid).set({});
    this.handleGetUserHistory();
  }

  render() {
    const { history } = this.state;
    if (!history) {
      return <LoadingState />
    }
    return (
      <Container>
        <Grid columns={2} stretched={true} padded={20}>
            <div>
                <Input labelPosition='right' type='text' placeholder='Ticker'>
                    <Label basic>Ticker</Label>
                    <input onChange={this.handleUpdateStockSearch}/>
                </Input>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label basic>Shares</Label>
                    <input onChange={this.handleUpdateShares}/>
                </Input>
                <Button primary id="form-button-control-public " onClick={this.purchaseStock}>Purchase</Button>
                <Button secondary id="form-button-control-public " onClick={this.sellStock}>Sell</Button>
                <Button color='red' onClick={this.deleteHistory} >Delete History</Button>
            </div>
        </Grid>
        <Label>History:</Label>
        {history.toList().sortBy(stock => -stock.get('date')).map(this.renderHistory)}
      </Container>
    );
  }
}