import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Board from './MainPages/Board';


import { Team } from './Team';

export default class Two extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/team">Team</Link>
                    </li>
                    <li>
                        <Link to="/board">Board</Link>
                    </li>
                </ul>


                <Switch>
                    <Route path='/board' exact component={Board} />
                    <Route path='/team' exact component={Team} />
                </Switch>     
            </div>      
        );
    }
}

