import React, { Component } from 'react';
import '../addTask.css'

export class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            roleId: 1,
        };

        this.onChange = this.onChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            name: value
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
                    <h3>User info</h3>
                    <input type="text" placeholder="UserName" onChange={this.onChange} />
                    <input type="text" placeholder="Password" onChange={this.onChange} />
                    <div class="dropdown">
                        <select name="one" class="dropdown-select" onChange={this.onChange}>
                            <option value="1" defaultChecked>Guest</option>
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