import React from 'react';
import '../styles/addTask.css'

export class UpdateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            userName: '',
            password: '',
            roleId: 1,
        };

        this.onChange = this.onChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    getUser() {
        fetch('https://localhost:44330/User/' + this.state.id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    userName: data.userName,
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch('https://localhost:44330/User', requestOptions)
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
                    <h3>User info</h3>
                    <input type="text" placeholder="UserName" name="userName" onChange={this.onChange} value={this.state.userName} />
                    <input type="text" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
                    <div class="dropdown">
                        <select name="roleId" class="dropdown-select" onChange={this.onChange} value={this.state.roleId}>
                            <option value="1">Guest</option>
                            <option value="2">Developer</option>
                            <option value="3">Manager</option>
                            <option value="4">Tester</option>
                            <option value="5">DevOps</option>
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}
