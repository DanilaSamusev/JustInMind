import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<div>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route path='/counter' component={Counter} />
				<Route path='/fetch-data' component={FetchData} />
			</div>
		);
	}
}
