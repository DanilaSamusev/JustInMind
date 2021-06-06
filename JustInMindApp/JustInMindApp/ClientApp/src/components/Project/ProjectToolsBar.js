import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SelectProjectTool from './Tools/SelectProjectTool';
import CreateProjectTool from './Tools/CreateProjectTool';
import DeleteProjectTool from './Tools/DeleteProjectTool';
import { RenameProjectTool } from './Tools/RenameProjectTool';

export function ProjectToolsBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.leftPanel}>
                <div>
                    <RenameProjectTool project={props.project} validateFetchResponse={props.validateFetchResponse}/>
                </div>
            </div>
            <div className={classes.rightPanel}>
                <div className={classes.item} >
                    <CreateProjectTool openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} />
                </div>
                <div className={classes.item} >
                    <SelectProjectTool selectProject={props.selectProject} validateFetchResponse={props.validateFetchResponse} />
                </div>
                <div className={classes.item} >
                    <DeleteProjectTool resetProject={props.resetProject} project={props.project} openSnackbar={props.openSnackbar} selectProject={props.selectProject} validateFetchResponse={props.validateFetchResponse} />
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '600px',
    },
    leftPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '5%',
        width: '600px',
    },
    item: {
        marginRight: '2%',
    }
}));
