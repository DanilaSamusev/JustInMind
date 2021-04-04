﻿import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar';
import { Logout } from '../Logout';
import { Boards } from '../Task/Boards'
import ProjectSelection from '../ProjectSelection';

import '../../styles/board.css'

export default function Board() {

    const [isAuthorized, setIsAuthorized] = useState(true);
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

                    setIsAuthorized(false);
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

    const logout = () => {
        setIsAuthorized(false);
    }

    if (!isAuthorized) {
        return (
            <Redirect to='/login' />
        )
    }

    let render =
        <div>
            <Navbar />

            <Logout logout={logout} />

            <ProjectSelection selectProject={selectProject} />
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