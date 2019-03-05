import {List} from 'immutable';

export const STOCK_FIELD_NAMES = {
    SYMBOL: 'symbol',
    COMPANY_NAME: 'companyName',
    PRICE : 'latestPrice',
    DAY_HIGH : 'high',
    DAY_LOW : 'low',
    YEAR_HIGH : 'week52High',
    YEAR_LOW : 'week52Low',
    OPEN_PRICE : 'open',
};

export const DEFAULTS_STOCKS = List(['MSFT', 'AAPL', 'SNAP', 'TSLA', 'GOOG']);
export const STOCK_FIELDS_TO_KEEP = List([STOCK_FIELD_NAMES.SYMBOL, STOCK_FIELD_NAMES.COMPANY_NAME, STOCK_FIELD_NAMES.PRICE, STOCK_FIELD_NAMES.DAY_HIGH, STOCK_FIELD_NAMES.DAY_LOW, STOCK_FIELD_NAMES.YEAR_HIGH, STOCK_FIELD_NAMES.YEAR_LOW, STOCK_FIELD_NAMES.OPEN_PRICE]);