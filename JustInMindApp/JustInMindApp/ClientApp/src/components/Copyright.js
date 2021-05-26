import React from 'react';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                JustInMind
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
