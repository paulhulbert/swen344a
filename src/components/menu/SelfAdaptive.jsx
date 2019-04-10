import React, { PureComponent } from 'react';
import {fromJS} from "immutable";

export default class SelfAdaptive extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            serverCount: 0,
        };
        this.handleServerUpdate = this.handleServerUpdate.bind(this);
    }

    componentDidMount() {
        this.fetchServersUp();
    }

    handleServerUpdate(load) {
        this.setState({
            loadAd: load,
        });
    }

    fetchServersUp(serverNumber = 1, total = 0) {
        if (serverNumber < 5) {
            fetch(`https://adaptive-server.herokuapp.com/availability/${serverNumber}`)
                .then(response => response.json())
                .then(fromJS)
                .then((response) => {
                    this.fetchServersUp(++serverNumber, total + response.get('availability'))
                });
        }
        else if (serverNumber == 5) {
            fetch(`https://adaptive-server.herokuapp.com/serverload`)
                .then(response => response.json())
                .then(fromJS)
                .then((response) => {
                    this.fetchServersUp(++serverNumber, (total * 10 - response.get('load') > 0))
                });
        } else {
            this.handleServerUpdate(total)
        }
    }

    render() {

        if (this.state.loadAd) {
            return (
                <a href={"https://www.rit.edu"}>
                    <img src={"http://www.se.rit.edu/~swen-344/projects/selfadaptive/images/RITlogo.png"}
                         height={"28px"} width={"32px"} alt={"Advertisement image"}/>
                </a>
            );
        } else {
            return null;
        }
    }
}