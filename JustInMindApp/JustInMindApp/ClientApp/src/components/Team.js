import React from 'react';

import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { LoadingPage } from './LoadingPage';

import '../styles/team.scss'

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
        fetch('user/getAll')
            .then(response => {
                if (response.status == 401) {
                    alert('You are not authorized!');

                    this.setState({
                        isAuthorized: false,
                    });
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

    componentDidMount() {
        this.getUsers();
    }

    render() {

        if (!this.state.isAuthorized) {
            return (
                <Redirect to='/login' />
            )
        }

        if (!this.state.isPageLoaded) {
            return (
                <div>
                    <Navbar />
                    <LoadingPage />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Navbar />

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