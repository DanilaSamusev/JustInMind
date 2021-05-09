import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ProjectSelection from './ProjectSelection';

export function ProjectToolsBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProjectSelection selectProject={props.selectProject} validateFetchResponse={props.validateFetchResponse}/>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        minHeight: '100px',
        marginRight: '25px',
    },
}));
