import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Board from '../MainPages/Board';
import Navbar from '../Navbar';


import { Team } from '../MainPages/Team';

export default class AppRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />

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

