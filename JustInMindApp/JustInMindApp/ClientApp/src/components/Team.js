import React from 'react';
import { LoadingPage } from './LoadingPage';
import { Link } from 'react-router-dom';

import '../styles/team.scss'

export class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isPageLoaded: false,
        };

        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
        fetch('User/getAll')
            .then(response => response.json())
            .then(data => this.setState(
                {
                    users: data,
                    isPageLoaded: true
                }))
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        if (this.state.isPageLoaded == 0) {
            return (
                <LoadingPage />
            )
        }
        else {
            return (
                <div>
                    <Link className='add_user_button' to={'/addUser'}>Add user</Link>

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
                                        <Link to={'/updateUser/' + user.id}>
                                            Edit
                                    </Link>
                                    </td>
                                    <td>
                                        <Link to={'/deleteUser/' + user.id}>
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