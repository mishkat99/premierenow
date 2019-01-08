import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		switch(this.props.user) {
			case null:
				return;
			case false:
				return (
					<a role="button" className="button is-primary" href="/auth/google">Sign in with Google</a>
				)
			default:
				return (
					<a role="button" className="button is-light" href="/api/logout">Logout</a>
				)
		}
	}

	render() {
		return (
			<nav className="navbar" role="navigation">
				<div className="navbar-brand">
					<Link className="navbar-item" to={this.props.user ? '/home' : '/'}>
						PremiereNow
					</Link>
				</div>
				<div className="navbar-end">
					<div className="navbar-item">
						{this.renderContent()}
					</div>
				</div>
				
			</nav> 
		)
	}
}

const mapStateToProps = ({user}) => ({ user })

export default connect(mapStateToProps)(Header);