import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Board from '../MainPages/Board';
import NavigationBar from '../Navigation/NavigationBar';
import { Team } from '../MainPages/Team';

export default function AppRoutes(props) {
    return (
        <div>
            <NavigationBar setIsAuthorized={props.setIsAuthorized} />
            <Switch>
                <Route path='/' exact>
                    <Board setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
                </Route>
                <Route path='/team' exact>
                    <Team setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
                </Route>
            </Switch>
        </div>
    );
}