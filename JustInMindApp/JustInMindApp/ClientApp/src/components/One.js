import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from './Account/SignIn';
import SignUp from './Account/SignUp';

export default class Two extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/signIn">SignIn</Link>
                    </li>
                    <li>
                        <Link to="/signOut">SignOut</Link>
                    </li>
                </ul>


                <Switch>
                    <Route path='/signIn' exact component={SignIn} />
                    <Route path='/signOut' exact component={SignUp} />
                </Switch>
            </div>
        );
    }
}
