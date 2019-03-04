import { DEFAULTS_STOCKS, STOCK_FIELDS_TO_KEEP } from '../../constants/stocksConstants';
import { fromJS } from 'immutable';

function processIndividualStockData(stock) {
    return stock.get('quote').filter((_, key) => {
        return STOCK_FIELDS_TO_KEEP.includes(key);
    });
}

function processRawStocks(stocks) {
    return stocks.map(processIndividualStockData);
}

function getStockSymbols(stocks) {
    return stocks.toJS().join(',');
}

export function fetchStocks(callback) {
    fetchStockData(DEFAULTS_STOCKS, callback);
}

function fetchStockData(stocks, callback){
    fetch(`https://api.iextrading.com/1.0/stock/market/batch/?symbols=${getStockSymbols(stocks)}&types=quote`)
        .then((resp) => resp.json())
        .then(fromJS)
        .then(processRawStocks)
        .then(callback);
}