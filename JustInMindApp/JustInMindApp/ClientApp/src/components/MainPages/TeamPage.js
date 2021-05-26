import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import UsersTable from '../User/UsersTable';

const useStyles = makeStyles((theme) => ({
    userTable: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
}));

export function TeamPage(props) {
    const classes = useStyles();

    return (
        <div className={classes.userTable}>
            <UsersTable openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} />
        </div>
    )
}