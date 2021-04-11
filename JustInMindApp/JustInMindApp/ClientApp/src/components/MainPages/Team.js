import React from 'react';
import { Link } from 'react-router-dom';

import { SignOut } from '../Account/SignOut';
import { LoadingPage } from '../LoadingPage';

import '../../styles/team.scss'

export class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isPageLoaded: false,
            isAuthorized: true,
        };

        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
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
                    this.props.setIsAuthorized(false);
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

    deleteUser = (user) => {
        this.fetchDeleteColaborator(user.id);
	}

    fetchDeleteColaborator = (userId) => {
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
                    this.props.setIsAuthorized(false);
                }
            })
            .then(() => {
                this.getUsers();
            });
	}

    componentDidMount() {
        this.getUsers();
    }

    render() {
        if (!this.state.isPageLoaded) {
            return (
                <div>
                    <LoadingPage />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link className='add_user_button' to={'addUser'}>Add user</Link>
                    <table className="responstable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>UserName</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <Link to={'updateUser/' + user.id}>
                                            Edit
                                    </Link>
                                    </td>
                                    <td>
                                        <Link onClick={() => this.deleteUser(user)}>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}