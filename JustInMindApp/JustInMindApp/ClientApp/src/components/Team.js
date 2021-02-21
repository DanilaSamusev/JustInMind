import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/team.scss'

export class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };

        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
        fetch('https://localhost:44330/User/getAll')
            .then(response => response.json())
            .then(data => this.setState(
                {
                    users: data
                }))
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <table className="responstable">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
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
        );
    }
}