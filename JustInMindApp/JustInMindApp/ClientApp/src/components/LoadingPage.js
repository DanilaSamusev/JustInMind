﻿import React from 'react';
import '../styles/loadingPage.css'

export class LoadingPage extends React.Component {

    render() {
        return (
            <div className='loadingIcon' >
                <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        );
    }
}