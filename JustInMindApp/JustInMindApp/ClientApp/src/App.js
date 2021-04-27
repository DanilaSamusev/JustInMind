import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './styles/custom.css'
import AppRoutes from './components/Routes/AppRoutes';
import AccountRoutes from './components/Routes/AccountRoutes';
import { useEffect } from 'react';
import CustomSnackbar from './components/CustomSnackbar';

export default function App(props) {
    const [snackBarData, setSnackBarData] = useState({})
    const [isAuthorized, setIsAuthorized] = useState(true)
    const history = useHistory();

    useEffect(() => {
        if (!isAuthorized) {
            history.push('/signIn');
        }
        else {
            history.push('/');
        }

    }, [isAuthorized]);

    const openSnackbar = (isOpen, status, message) => {

        setSnackBarData(
            {
                'isOpen': isOpen,
                'status': status,
                'message': message
            }
        )
    }

    const setIsUserAuthorized = (isAuthorized) => {
        setIsAuthorized(isAuthorized);
    }

    let component = isAuthorized ?
        <AppRoutes setIsAuthorized={setIsUserAuthorized} openSnackbar={openSnackbar} /> :
        <AccountRoutes setIsAuthorized={setIsUserAuthorized} openSnackbar={openSnackbar} />

    console.log(component)

    return (
        <div>
            {component}
            <CustomSnackbar openSnackbar={openSnackbar} snackBarData={snackBarData} />
        </div>
    );

}
