import React from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectSelection from './ProjectSelection';
import { makeStyles } from '@material-ui/core/styles';

import { AddProject } from './AddProject';

export function ProjectToolsBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.item} >
                <AddProject />
            </div>
            <div className={classes.item} >
                <ProjectSelection selectProject={props.selectProject} validateFetchResponse={props.validateFetchResponse} />
            </div>
            <div className={classes.item} >
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </div>

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minHeight: '100px',
        alignItems: 'center',
    },
    item: {
        marginRight: '2%',
    }
}));
