import React from 'react';
import { Switch, Route } from "react-router-dom";

import BoardPage from '../MainPages/BoardPage';
import NavigationBar from '../Navigation/NavigationBar';
import { TeamPage } from '../MainPages/TeamPage';

export default function AppRoutes(props) {
    return (
        <div>
            <NavigationBar setIsAuthorized={props.setIsAuthorized} />
            <Switch>
                <Route path='/' exact>
                    <BoardPage validateFetchResponse={props.validateFetchResponse} openSnackbar={props.openSnackbar} />
                </Route>
                <Route path='/team' exact>
                    <TeamPage validateFetchResponse={props.validateFetchResponse} openSnackbar={props.openSnackbar} />
                </Route>
            </Switch>
        </div>
    );
}