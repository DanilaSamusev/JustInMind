import React, { useState, useEffect } from 'react';

import { Boards } from '../Task/Boards'
import { ProjectToolsBar } from '../Project/ProjectToolsBar';
import FetchHelper from '../../Helpers/FetchHelper';

export default function Board(props) {
    const [project, setProject] = useState(null);

    useEffect(() => {
        refreshLastSelectedProject();
    }, []);

    const refreshLastSelectedProject = async () => {
        if (localStorage.projectId == null) {
            return;
        }

        let lastSelectedProjectResponse = await FetchHelper.fetchGet('project/' + localStorage.projectId, localStorage.token);
        let lastSelectedProject = await props.validateFetchResponse(lastSelectedProjectResponse);

        setProject(lastSelectedProject);
    }

    const selectProject = async (projectId) => {
        let projectResponse = await FetchHelper.fetchGet('project/' + projectId, localStorage.token);
        let project = await props.validateFetchResponse(projectResponse);

        setProject(project);
        localStorage.setItem('projectId', projectId)
    }

    return (
        <div>
            <ProjectToolsBar selectProject={selectProject} setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse} />
            <Boards project={project} setIsAuthorized={props.setIsAuthorized} openSnackbar={props.openSnackbar} validateFetchResponse={props.validateFetchResponse}/>
        </div>
    )
}