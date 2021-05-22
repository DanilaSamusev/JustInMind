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
                    <BoardPage setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse}/>
                </Route>
                <Route path='/team' exact>
                    <TeamPage setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse}/>
                </Route>
            </Switch>
        </div>
    );
}