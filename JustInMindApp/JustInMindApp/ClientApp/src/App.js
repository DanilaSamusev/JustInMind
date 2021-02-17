import React, { Component } from 'react';

import { AddTask } from './components/AddTask';
import { UpdateTask } from './components/UpdateTask';
import { Home } from './components/Home';
import { Board } from './components/Board';
import { Login } from './components/Login';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Navbar from './components/Navbar';
import { NavigationBar } from './components/NavigationBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/addTask' exact component={AddTask} />
                    <Route path='/updateTask' exact component={UpdateTask} />
                    <Route path='/board' exact component={Board} />
                </Switch>
            </Router>
        );
    }
}
