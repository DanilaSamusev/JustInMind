import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Team } from './components/Team';
import { SignIn } from './components/Account/SignIn';
import { AddUser } from './components/AddUser';
import { UpdateUser } from './components/UpdateUser';
import Board from './components/MainPages/Board';
import SignUp from './components/Account/SignUp';

import './styles/custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                
                <Switch>
                    <Route path='/' exact component={Board} />
                    <Route path='/team' exact component={Team} />
                    <Route path='/board' exact component={Board} />
                    <Route path='/signIn' exact component={SignIn} />
                    <Route path='/signUp' exact component={SignUp} />

                    //Just for test this components. Remove in release
                    <Route path='/addUser' exact component={AddUser} />
                    <Route path='/updateUser/:id' exact component={UpdateUser} />
                    
                </Switch>
            </Router>
        );
    }
}
