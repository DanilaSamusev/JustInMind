import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Board from './MainPages/Board';


import { Team } from './Team';

export default class AppRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/' exact>
                        <Board setIsAuthorized={this.props.setIsAuthorized}/>
                    </Route>
                    <Route path='/team' exact component={Team} />
                </Switch>
            </div>
        );
    }
}

