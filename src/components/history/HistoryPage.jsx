import React, { PureComponent } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import {fromJS} from "immutable";
import firebase from 'firebase/app';
import 'firebase/database';

export default class HistoryPage extends PureComponent {

    constructor() {
        super();
        this.state = {
            history: [],
        };
        this.updateHistory = this.updateHistory.bind(this);
        this.fetchHistory= this.fetchHistory.bind(this);
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
            const history = fromJS(response.val());
            updateHistory(history);
        });
    }

    render() {

        return (
            <Container>
                <div>
                    {this.state.history}
                </div>
            </Container>
        );
    }
}