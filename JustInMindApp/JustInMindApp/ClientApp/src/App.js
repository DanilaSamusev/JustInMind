import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Team } from './components/Team';
import { Login } from './components/Login';
import Board from './components/MainPages/Board';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';

import './styles/custom.css'
import SignUp from './components/Account/SignUp';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                
                <Switch>
                    <Route path='/' exact component={Board} />
                    <Route path='/team' exact component={Team} />
                    <Route path='/board' exact component={Board} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/signUp' exact component={SignUp} />

                    //Just for test this components. Remove in release
                    <Route path='/addUser' exact component={AddUser} />
                    <Route path='/updateUser/:id' exact component={UpdateUser} />
                    
                </Switch>
            </Router>
        );
    }
}
