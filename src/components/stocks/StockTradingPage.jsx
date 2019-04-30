import React, { PureComponent } from 'react';
import { Map, List } from 'immutable';
import LoadingState from '../common/LoadingState';
import { getOneYearStockChartData, fetchTopStocks, fetchStockData } from '../../utils/stocks/stocksUtils';
import StockChartSection from './StockChartSection';
import { Container, Grid, Button, Input, Label } from 'semantic-ui-react';
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
      history: Map()
    }
    this.handleUpdateStockSearch = this.handleUpdateStockSearch.bind(this);
    this.handleUpdateShares = this.handleUpdateShares.bind(this);
    this.purchaseStock = this.purchaseStock.bind(this);
    this.sellStock = this.sellStock.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
  }

  componentDidMount() {
    console.log('hi');
    console.log(firebase.auth().currentUser);
    firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid).once('value').then((response) => {
        this.setState({
          history: response.val() ? response.val().zipCode : null,
        })
      });
  }  

  handleUpdateStockSearch(event) {
    const searchTicker = event.target.value;
    this.setState({
        searchTicker,
    })
  }

  handleUpdateShares(){
    const shares = event.target.value;
    this.setState({
        shares,
    })
  }

  purchaseStock() {
    firebase.database().ref("userStocks/" + firebase.auth().currentUser.uid).set({
      stocks: {
          ticker : this.state.ticker,
          shares : this.state.shares
      },
    });
  }

  sellStock() {
    firebase.database().ref("userZipCode/" + firebase.auth().currentUser.uid).set({
      zipCode: this.state.zipCode,
    });
  }

  renderHistory(historyData){
    return(
        <Card
            fluid={true}
        >
            <Card.Content>
                <Card.Header>
                    {historyData.get('ticker')}
                </Card.Header>
                <Card.Meta>
                    {historyData.get('shares')}
                </Card.Meta>
                <Card.Description>
                    Hi
                </Card.Description>
            </Card.Content>
        </Card>
    )
  }

  render() {
    return (
      <Container>
        <Grid columns={2} stretched={true} padded={10}>
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
            </div>
        </Grid>
        <Label>History:</Label>
        {this.state.history.toList().map(this.renderIndividualStock)}
      </Container>
    );
  }
}