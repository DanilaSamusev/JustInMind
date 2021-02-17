import React from "react";
import "../styles/login.css";
import logo from "../logo.png";

export class Login extends React.Component {
	render() {
		return (
			<form class="form-signin">
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
				/>
				
				<input
					type="password"
					id="inputPassword"
					class="form-control"
					placeholder="Password"
					required=""
				/>
				
				<button class="btn btn-lg btn-primary btn-block" type="submit">
					Sign in
      </button>
				<p class="mt-5 mb-3 text-muted">BRU 2021</p>
			</form>
		);
	}
}