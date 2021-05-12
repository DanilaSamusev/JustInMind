import React from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

export function AddProject(props) {
    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
            >
                New
            </Button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
}));