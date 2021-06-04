import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SelectProjectTool from './Tools/SelectProjectTool';
import CreateProjectTool from './Tools/CreateProjectTool';
import DeleteProjectTool from './Tools/DeleteProjectTool';

export function ProjectToolsBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.item} >
                <CreateProjectTool openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} />
            </div>
            <div className={classes.item} >
                <SelectProjectTool selectProject={props.selectProject} validateFetchResponse={props.validateFetchResponse} />
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
