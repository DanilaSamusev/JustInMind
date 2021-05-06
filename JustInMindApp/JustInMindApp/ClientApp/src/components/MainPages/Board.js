import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ProjectSelection from '../ProjectSelection';
import { Boards } from '../Task/Boards'

const useStyles = makeStyles((theme) => ({
    projectSelectionContainer: {
        marginTop: '20px',
    },
    projectName: {
        textAlign: 'center',
    },
}));

export default function Board(props) {
    const classes = useStyles();
    const [project, setProject] = useState(null);

    useEffect(() => {
        getLastSelectedProject();
    }, []);

    const getLastSelectedProject = () => {
        if (localStorage.getItem('projectId') == null) {
            return;
        }

        fetchGetProjectById(Number(localStorage.getItem('projectId')));
    }

    const fetchGetProjectById = (projectId) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }

        fetch('project/' + projectId, requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                    props.setIsAuthorized(false);
                }
                else {
                    response.json()
                        .then(data => {
                            setProject(data);
                        });
                }
            })
    }

    const selectProject = (projectId) => {
        fetchGetProjectById(projectId);
        localStorage.setItem('projectId', projectId)
    }

    let render =
        <div className={classes.projectSelectionContainer}>
            <ProjectSelection selectProject={selectProject} setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
        </div>

    let boards;

    if (project != null) {
        boards =
            <div>
                <h1 className={classes.projectName}>{project.name}</h1>
                <Boards project={project} setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} />
            </div>
    }
    else {
        boards = <h1 className={classes.projectName}>No project selected</h1>
    }

    return (
        <div>
            {render}
            {boards}
        </div>
    )
}