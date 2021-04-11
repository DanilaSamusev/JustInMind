import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from './Account/SignIn';
import SignUp from './Account/SignUp';

export default function Two(props) {
    return (
        <div>
            <Switch>
                <Route path='/signIn' exact >
                    <SignIn setIsAuthorized={props.setIsAuthorized} />
                </Route>
                <Route path='/signOut' exact component={SignUp} />
            </Switch>
        </div>
    );
}
