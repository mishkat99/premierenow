import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Subscriptions from './Subscriptions';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path='/' component={Landing} />
						<Route path='/home' component={Dashboard} />
						<Route path='/subscriptions' component={Subscriptions} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}


export default connect(null, actions)(App);