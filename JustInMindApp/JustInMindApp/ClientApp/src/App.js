import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './styles/custom.css'
import AppRoutes from './components/Routes/AppRoutes';
import AccountRoutes from './components/Routes/AccountRoutes';

export default function App(props) {
    const [isAuthorized, setIsAuthorized] = useState(true)
    const history = useHistory();

    const setIsUserAuthorized = (isAuthorized) => {
        setIsAuthorized(isAuthorized);

        if (!isAuthorized) {
            history.push('/signIn');
        }
        else {
            history.push('/');
        }   
    }

    let component = isAuthorized ? <AppRoutes setIsAuthorized={setIsUserAuthorized} /> : <AccountRoutes setIsAuthorized={setIsUserAuthorized} />

    return (
        <div>
            {component}
        </div>
    );

}
