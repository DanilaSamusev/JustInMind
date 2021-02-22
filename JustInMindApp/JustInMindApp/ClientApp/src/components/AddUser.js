import React from 'react';
import '../styles/addTask.css'

export class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            roleId: 1,
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
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

    submitUser() {
        const requestOptions = {
            method: 'POST',
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
                    <h3>Add user</h3>
                    <input type="text" placeholder="UserName" name="userName" onChange={this.onChange} />
                    <input type="text" placeholder="Password" name="password" onChange={this.onChange} />
                    <div class="dropdown">
                        <select name="roleId" class="dropdown-select" onChange={this.onSelectChange}>
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