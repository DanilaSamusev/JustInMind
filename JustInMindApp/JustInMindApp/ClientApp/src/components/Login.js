import { React } from "react";

import "../styles/login.css";
import logo from "../logo.png";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    fetchLogin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }

        fetch('account/token', requestOptions)
            .then(response => response.json())
            .then(json => localStorage.setItem('token', json.token))
            .then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div class="form-signin">
                <img
                    class="mb-4"
                    src={logo}
                    alt=""
                    width="200"
                    height="80"
                />
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

                <input
                    id="inputLogin"
                    class="form-control"
                    placeholder="Login"
                    required=""
                    autofocus=""
                    name="name"
                    onChange={this.onChange}
                    value={this.state.name}
                />

                <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required=""
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                />

                <button class="btn btn-lg btn-primary btn-block" onClick={this.fetchLogin}>
                    Sign in
                </button>
                <p class="mt-5 mb-3 text-muted">BRU 2021</p>
            </div>
        );
    }
}