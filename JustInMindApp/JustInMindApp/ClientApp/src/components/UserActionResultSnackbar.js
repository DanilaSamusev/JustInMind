import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function UserActionResultSnackbar(props) {
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.openSnackbar(false, props.snackBarData.status, props.snackBarData.message)
    };

    if (props.snackBarData.message == null) {
        return (
            <div />
        );
    }

    return (
        <div className={classes.root}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={props.snackBarData.isOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity={props.snackBarData.status}>
                    {props.snackBarData.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
