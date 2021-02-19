import React from 'react';
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
                        <th>RoleId</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.users.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.userName}</td>
                            <td>{item.password}</td>
                            <td>{item.roleId}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        );
    }
}