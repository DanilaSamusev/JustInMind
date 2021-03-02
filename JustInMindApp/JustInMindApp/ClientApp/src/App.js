import React, { Component } from 'react';

import { Home } from './components/Home';
import { Boards } from './components/Boards';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { AddTask } from './components/AddTask';
import { UpdateTask } from './components/UpdateTask';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';
import { Team } from './components/Team';

import './styles/custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/team' exact component={Team} />
                    <Route path='/boards' exact component={Boards} />

                    //Just for test this components. Remove in release
                    <Route path='/addTask/:stateId?' exact component={AddTask} />
                    <Route path='/updateTask/:id' exact component={UpdateTask} />
                    <Route path='/addUser' exact component={AddUser} />
                    <Route path='/updateUser/:id' exact component={UpdateUser} />
                </Switch>
            </Router>
        );
    }
}
