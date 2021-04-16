import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import UsersTable from '../UsersTable';

import '../../styles/team.scss'

const useStyles = makeStyles((theme) => ({
    userTable: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
}));

export function Team(props) {
    const classes = useStyles();
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const getUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
        }

        fetch('user/getAllColaborators/' + Number(localStorage.getItem("projectId")), requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                    props.setIsAuthorized(false);
                }
                else {
                    response
                        .json()
                        .then(data => this.setState(
                            {
                                users: data,
                                isPageLoaded: true,
                                isAuthorized: true,
                            }))
                }
            })
    }

    const deleteUser = (user) => {
        fetchDeleteColaborator(user.id);
    }

    const fetchDeleteColaborator = (userId) => {
        const deleteColaboratorRequest = {
            'userId': userId,
            'projectId': Number(localStorage.getItem('projectId')),
        }

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(deleteColaboratorRequest)
        }

        fetch('user', requestOptions)
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');
                    props.setIsAuthorized(false);
                }
            })
            .then(() => {
                getUsers();
            });
    }

    return (
        <div className={classes.userTable}>
            <UsersTable setIsAuthorized={props.setIsAuthorized}/>
        </div>
    )
}