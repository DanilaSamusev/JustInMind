import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Team } from './components/Team';
import { SignIn } from './components/Account/SignIn';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';
import Board from './components/MainPages/Board';
import SignUp from './components/Account/SignUp';

import './styles/custom.css'
import Two from './components/Two';
import One from './components/One';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                
                <One />
                <Two />
            </Router>
        );
    }
}
