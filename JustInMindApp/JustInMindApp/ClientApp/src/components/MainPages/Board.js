import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import ProjectSelection from '../ProjectSelection';
import { SignOut } from '../Account/SignOut';
import { Boards } from '../Task/Boards'

import '../../styles/board.css'

export default function Board(props) {
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
        <div>
            <ProjectSelection selectProject={selectProject} setIsAuthorized={props.setIsAuthorized} />
        </div>;

    let boards = <h1>No project selected</h1>

    if (project != null) {
        boards =
            <div>
                <h1>
                    {project.name}
                </h1>
                <Boards project={project} />
            </div>
    }

    return (
        <div>
            {render}
            {boards}
        </div>
    )
}