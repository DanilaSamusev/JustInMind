import React from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectSelection from './ProjectSelection';
import { makeStyles } from '@material-ui/core/styles';

import { AddProject } from './AddProject';
import FetchHelper from '../../Helpers/FetchHelper';

export function ProjectToolsBar(props) {
    const classes = useStyles();

    const deleteProject = async () => {
        let response = await FetchHelper.fetchDelete('project/' + props.project.id, localStorage.token);
        let result = await props.validateFetchResponse(response);

        if (result) {
            props.resetProject();
            props.openSnackbar(true, 'success', 'Project is deleted');
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.item} >
                <AddProject validateFetchResponse={props.validateFetchResponse} openSnackbar={props.openSnackbar}/>
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
                    onClick={() => deleteProject()}
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
