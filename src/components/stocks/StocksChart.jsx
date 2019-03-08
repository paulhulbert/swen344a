import React from 'react';
import {
  Line as LineChart
} from 'react-chartjs-2'
import { getChartLabels } from '../../utils/stocks/stocksUtils';
import { CHART_OPTIONS, CHART_DAY_FIELDS, CHART_TYPES, LINE_COLOR } from '../../constants/stockChartConstants';

function formatChartData(chartData, stockTicker) {
  return {
    labels: getChartLabels(CHART_TYPES.ONE_YEAR, chartData).toJS(),
    datasets: [{
      label: stockTicker,
      fill: false,
      data: chartData.map(data => data.get(CHART_DAY_FIELDS.CLOSE)).toJS(),
      pointRadius: 0,
      borderColor: LINE_COLOR,
      pointHitRadius: 10,
    }],
  }
}

export function StocksChart({
  stockTicker,
  stockChartData,
}) {
  return (
    <LineChart data={formatChartData(stockChartData, stockTicker)} options={CHART_OPTIONS}/>
  )
}