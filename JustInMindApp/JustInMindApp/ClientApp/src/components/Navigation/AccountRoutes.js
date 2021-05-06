import React from 'react';
import { Switch, Route } from "react-router-dom";

import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';

export default function Two(props) {
    return (
        <div>
            <Switch>
                <Route path='/signIn' exact>
                    <SignIn setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
                </Route>
                <Route path='/signUp' exact>
                    <SignUp setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
                </Route>
            </Switch>
        </div>
    );
}
