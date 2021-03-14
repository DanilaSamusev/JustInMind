import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Home } from './components/Home';
import { Team } from './components/Team';
import { Login } from './components/Login';
import { Boards } from './components/Boards';
import { AddTask } from './components/AddTask';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';

import './styles/custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/team' exact component={Team} />
                    <Route path='/boards' exact component={Boards} />
                    <Route path='/login' exact component={Login} />

                    //Just for test this components. Remove in release
                    <Route path='/addTask/:stateId?' exact component={AddTask} /> 
                    <Route path='/addUser' exact component={AddUser} />
                    <Route path='/updateUser/:id' exact component={UpdateUser} />
                    
                </Switch>
            </Router>
        );
    }
}
