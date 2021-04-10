import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar';
import { SignOut } from '../Account/SignOut';
import { Boards } from '../Task/Boards'
import ProjectSelection from '../ProjectSelection';

import '../../styles/board.css'

export default function Board(props) {

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
        localStorage.removeItem('projectId');
    }

    if (!isAuthorized) {
        return (
            <Redirect to='/signIn' />
        )
    }

    let render =
        <div>
            <Navbar />

            <SignOut logout={logout} />

            <ProjectSelection selectProject={selectProject} setIsAuthorized={props.setIsAuthorized}/>
        </div>;

   

    

    return (
        <div>
            {render}
            
        </div>
    )
}