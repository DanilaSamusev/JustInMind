import { useEffect } from 'react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import UserActionResultSnackbar from './components/UserActionResultSnackbar';
import AppRoutes from './components/Navigation/AppRoutes';
import AccountRoutes from './components/Navigation/AccountRoutes';

import './styles/custom.css'

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

    const validateFetchResponse = async (response) => {
        if (response.status == 401) {
            openSnackbar(true, 'error', 'You are not authorized!');
            setIsAuthorized(false);
        }
        else {
            return 1;
        }
    }

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

    let content = isAuthorized ?
        <AppRoutes setIsAuthorized={setIsUserAuthorized} openSnackbar={openSnackbar} validateFetchResponse={validateFetchResponse} /> :
        <AccountRoutes setIsAuthorized={setIsUserAuthorized} openSnackbar={openSnackbar} />

    return (
        <div>
            {content}
            <UserActionResultSnackbar openSnackbar={openSnackbar} snackBarData={snackBarData} />
        </div>
    );

}
