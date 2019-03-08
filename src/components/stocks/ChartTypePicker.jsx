import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { CHART_TYPES } from '../../constants/stockChartConstants';

const CHART_TYPE_LABELS = fromJS([
  {
    label: '5 day',
    value: CHART_TYPES.FIVE_DAY,
  },
  {
    label: '1 month',
    value: CHART_TYPES.ONE_MONTH,
  },
  {
    label: '6 months',
    value: CHART_TYPES.SIX_MONTHS,
  },
  {
    label: 'YTD',
    value: CHART_TYPES.YEAR_TO_DATE,
  },
  {
    label: '1 year',
    value: CHART_TYPES.ONE_YEAR,
  },
]);

export default class ChartTypePicker extends PureComponent {
  constructor() {
    super();
    this.renderChartType = this.renderChartType.bind(this);
  }

  renderChartType(chartType) {
    const value = chartType.get('value');
    return (
      <Menu.Item
        key={value}
        name={chartType.get('label')}
        active={this.props.activeChartType === value}
        onClick={() => this.props.handleClickChartType(value)}
      />
    );
  }

  renderChartTypes() {
    return CHART_TYPE_LABELS.map(this.renderChartType);
  }

  render() {
    return (
      <Menu
        pointing
        secondary
      >
        <Menu.Menu
          position="right"
        >
          {this.renderChartTypes()}
        </Menu.Menu>
      </Menu>
    );
  }
}

ChartTypePicker.propTypes = {
  activeChartType: PropTypes.string.isRequired,
  handleClickChartType: PropTypes.func.isRequired,
};
