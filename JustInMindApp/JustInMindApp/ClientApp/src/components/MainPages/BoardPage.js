import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Boards from '../Task/Boards'
import { ProjectToolsBar } from '../Project/ProjectToolsBar';
import FetchHelper from '../../Helpers/FetchHelper';

export default function BoardPage(props) {
    const classes = useStyles();

    const [project, setProject] = useState(null);

    useEffect(() => {
        refreshLastSelectedProject();
    }, []);

    const refreshLastSelectedProject = async () => {
        if (localStorage.projectId == null) {
            return;
        }

        let lastSelectedProjectResponse = await FetchHelper.fetchGet('project/' + localStorage.projectId, localStorage.token);
        let isLastSelectedProjectValid = await props.validateFetchResponse(lastSelectedProjectResponse);

        if (isLastSelectedProjectValid) {
            let lastSelectedProject = await lastSelectedProjectResponse.json();
            setProject(lastSelectedProject);
        }
    }

    const selectProject = async (projectId) => {
        let projectResponse = await FetchHelper.fetchGet('project/' + projectId, localStorage.token);
        let isProjectResponseValid = await props.validateFetchResponse(projectResponse);

        if (isProjectResponseValid) {
            let project = await projectResponse.json();
            setProject(project);
            localStorage.setItem('projectId', projectId)
        }
    }

    return (
        <div>
            
            <Boards project={project} setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse}/>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    projectToolsBar: {
        marginTop: '1%',
    }
}));