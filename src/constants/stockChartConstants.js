export const CHART_DAY_FIELDS = {
  CLOSE: 'close',
  DATE: 'date',
};

export const CHART_TYPES = {
  ONE_YEAR: 'ONE_YEAR',
  YEAR_TO_DATE: 'YEAR_TO_DATE',
  SIX_MONTHS: 'SIX_MONTHS',
  ONE_MONTH: 'ONE_MONTH',
  FIVE_DAY: 'FIVE_DAY',
  ONE_DAY: 'ONE_DAY',
};

export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const CHART_DATE_FORMATS = {
  [CHART_TYPES.YEAR_TO_DATE]: 'DD MMMM',
  [CHART_TYPES.FIVE_DAY]: 'DD MMMM',
  DEFAULT: 'DD MMMM YYYY',
};

export const LINE_COLOR = 'rgba(0, 0, 0, 0.5)';

export const CHART_OPTIONS = {
  elements: {
    line: {
      tension: 0, // disables bezier curves
    },
  },
  scales: {
    yAxes: [{
      ticks: {
        callback: value => `$${value}`,
      },
      // hide Y axis lines
      gridLines: {
        color: 'rgba(0, 0, 0, 0)',
      },
    }],
    xAxes: [{
      ticks: {
        autoSkip: true,
        maxTicksLimit: 5,
        maxRotation: 0,
        minRotation: 0,
      },
    }],
  },
  animation: {
    // no animations
    duration: 0,
  },
  legend: {
    display: false,
  },
};
