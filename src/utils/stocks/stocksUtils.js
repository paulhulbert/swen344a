import { DEFAULTS_STOCKS, STOCK_FIELDS_TO_KEEP } from '../../constants/stocksConstants';
import { fromJS, Map } from 'immutable';
import { CHART_DAY_FIELDS, CHART_DATE_FORMATS, API_DATE_FORMAT } from '../../constants/stockChartConstants';
import { CACHE_LENGTH_MINS } from '../../constants/cacheConstants';
import { DATE_FORMAT } from '../../constants/formats';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/database';

const BASE_URL = 'https://api.iextrading.com/1.0/stock';

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

export function fetchTopStocks(callback) {
    fetchStockData(DEFAULTS_STOCKS, callback);
}

function fetchStockData(stocks, callback){
    fetch(`${BASE_URL}/market/batch/?symbols=${getStockSymbols(stocks)}&types=quote`)
        .then((resp) => resp.json())
        .then(fromJS)
        .then(processRawStocks)
        .then(callback);
}

// chart utils

function getStockChartPath(ticker, date) {
    return `stocks/charts/${ticker}/${date}`;
}

export function getChartLabels(chartType, chartData) {
    return chartData.map((dataPoint) => {
        const pointDate = moment(dataPoint.get(CHART_DAY_FIELDS.DATE), API_DATE_FORMAT);
        return pointDate.format(CHART_DATE_FORMATS[chartType]);
    })
}

function parseStockChartData(rawData) {
    return rawData.map((dayData) => {
        return Map({
            [CHART_DAY_FIELDS.CLOSE]: dayData.get(CHART_DAY_FIELDS.CLOSE),
            [CHART_DAY_FIELDS.DATE]: dayData.get(CHART_DAY_FIELDS.DATE),
        })
    });
}

export function getOneYearStockChartData(ticker, callback) {
    const todayDate = moment().format(DATE_FORMAT);
    fetchCachedChartData(todayDate, ticker, callback);
}

function fetchCachedChartData(todayDate, ticker, callback) {
    return firebase.database().ref(getStockChartPath(ticker, todayDate)).once('value').then((response) => {
        const chartDataEntry = fromJS(response.val());
        if (!chartDataEntry || moment() > chartDataEntry.get('expireMillis')) {
            return fetchOneYearStockChartData(todayDate, ticker, callback);
        }
        callback(ticker, chartDataEntry.get('chartData'));
    });
}

function fetchOneYearStockChartData(todayDate, ticker, callback) {
    fetch(`${BASE_URL}/${ticker}/chart/1y`)
        .then((resp) => resp.json())
        .then(fromJS)
        .then(parseStockChartData)
        .then((chartData) => {
            // cache chart data for future use, and to avoid overloading API
            writeChartData(todayDate, ticker, chartData)
            callback(ticker, chartData);
        });
}

function writeChartData(todayDate, ticker, chartData) {
    const writeMoment = moment();
    const expireMoment = writeMoment.add(CACHE_LENGTH_MINS, 'minutes');
    firebase.database().ref(getStockChartPath(ticker, todayDate)).set({
        chartData: chartData.toJS(),
        fetchMillis: writeMoment.valueOf(),
        expireMillis: expireMoment.valueOf(),
    });
}