import React, { PureComponent } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import {fromJS, List} from "immutable";
import LoadingState from '../common/LoadingState';
import firebase from 'firebase/app';
import moment from 'moment';
import { LINE_COLOR } from '../../constants/stockChartConstants';
import {
    Line as LineChart
} from 'react-chartjs-2'
import 'firebase/database';

export const CHART_OPTIONS = {
    elements: {
        line: {
            tension: 0 // disables bezier curves
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                // whole numbers only
                precision: 0
            }
        }],
        xAxes: [{
            // hide Y axis lines
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
        }],
    },
    animation: {
        // no animations
        duration: 0,
    },
    legend: {
        display: false,
    },
}

const HISTORY_DATE_FORMAT = 'DD MMMM YYYY h:mm:ss a';

const historyToList = history => {
    return fromJS(history).reduce((historyList, historyItem, timestamp) => {
        const formattedTimestamp = moment(timestamp).format(HISTORY_DATE_FORMAT);
        return historyList.push(fromJS({
            load: historyItem.get('load'),
            serverCount: historyItem.get('serverCount'),
            timestamp: formattedTimestamp,
        }))
    }, List()).sortBy(item => moment(item.get('timestamp'), HISTORY_DATE_FORMAT).valueOf());
}

const formatChartData = (chartData, field) => {
    return {
        labels: chartData.map(data => data.get('timestamp')).toJS(),
        datasets: [{
            fill: false,
            data: chartData.map(data => data.get(field)).toJS(),
            pointRadius: 0,
            borderColor: LINE_COLOR,
            pointHitRadius: 10,
        }],
    }
}

export default class HistoryPage extends PureComponent {

    constructor() {
        super();
        this.state = {
            history: List(),
        };
        this.updateHistory = this.updateHistory.bind(this);
        this.fetchHistory = this.fetchHistory.bind(this);
    }

    componentDidMount() {
        this.fetchHistory(this.updateHistory);
    }

    updateHistory(history) {
        this.setState({
            history: history,
        })
    }

    fetchHistory(updateHistory) {
        return firebase.database().ref("SelfAdaptive").once('value').then((response) => {
            updateHistory(historyToList(response.val()));
        });
    }

    renderLoadChart(history) {
        return (
            <div>
                <Header as="h1">Server Load</Header>
                <LineChart data={formatChartData(history, 'load')} options={CHART_OPTIONS}/>
            </div>
        )
    }

    renderServerCountChart(history) {
        return (
            <div>
                <Header as="h1">Servers Up</Header>
                <LineChart data={formatChartData(history, 'serverCount')} options={CHART_OPTIONS}/>
            </div>
        )
    }


    renderHistoryCharts() {
        const { history } = this.state;
        if (!history) {
            return <LoadingState />;
        }
        return (
            <div>
                {this.renderLoadChart(history)}
                {this.renderServerCountChart(history)}
            </div>
        );
    }

    render() {

        return (
            <Container textAlign="center">
                {this.renderHistoryCharts()}
            </Container>
        );
    }
}