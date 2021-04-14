import React from 'react';

import '../styles/addTask.css'

export class UpdateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            name: '',
            password: '',
            roleId: 1,
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSelectChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: parseInt(value)
        })
    }

    getUser() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }

        fetch('user/' + this.props.match.params.id, requestOptions)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id: data.id,
                    name: data.name,
                    password: data.password,
                    roleId: data.roleId,
                }))
    }

    componentDidMount() {
        this.getUser();
    }

    submitUser() {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        }

        fetch('user', requestOptions)
            .then(response => response.status)
            .then((r) => console.log(r))
    }

    render() {
        return (
            <form class="decor" onSubmit={this.submitUser} >
                <div class="form-left-decoration"></div>
                <div class="form-right-decoration"></div>
                <div class="circle"></div>
                <div class="form-inner">
                    <h3>Edit user</h3>
                    <input type="text" placeholder="User Name" name="name" onChange={this.onChange} value={this.state.name} />
                    <input type="text" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
                    <div class="dropdown">
                        <select name="roleId" class="dropdown-select" onChange={this.onSelectChange} value={this.state.roleId}>
                            <option value='1'>Guest</option>
                            <option value='2'>Developer</option>
                            <option value='3'>Manager</option>
                            <option value='4'>Tester</option>
                            <option value='5'>DevOps</option>
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
