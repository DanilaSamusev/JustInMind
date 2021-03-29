import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Team } from './components/Team';
import { Login } from './components/Login';
import { Boards } from './components/Boards';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';

import './styles/custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                
                <Switch>
                    <Route path='/' exact component={Boards} />
                    <Route path='/team' exact component={Team} />
                    <Route path='/boards' exact component={Boards} />
                    <Route path='/login' exact component={Login} />

                    //Just for test this components. Remove in release
                    <Route path='/addUser' exact component={AddUser} />
                    <Route path='/updateUser/:id' exact component={UpdateUser} />
                    
                </Switch>
            </Router>
        );
    }
}
