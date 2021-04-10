import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './styles/custom.css'
import Two from './components/Two';
import One from './components/One';

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

    let component = isAuthorized ? <Two setIsAuthorized={setIsUserAuthorized} /> : <One setIsAuthorized={setIsUserAuthorized} />

    return (
        <div>
            {component}
        </div>
    );

}
