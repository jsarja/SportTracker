import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginBtn from './LoginBtn';
import { userLoggedIn } from '../../actions';

class Login extends React.Component {
	componentDidMount() {
		// Hide side bar if it exists.
		if(document.querySelector('#sidebar')) {
			document.querySelector('#sidebar').style.display = "none";
			document.querySelector('#sidebarOpen').style.display = "none";
		}
	}

	componentWillUnmount() {
		// Display side bar when login has completed.
		document.querySelector('#sidebar').style.display = "flex";
		document.querySelector('#sidebarOpen').style.display = "flex";
	}

	render () {
		// If user is already logged in redirect to the new workout page.
		if (this.props.userIsLoggedIn) {
			return <Redirect to='/sportTracker/newWorkout' />
		}
		
		return (
			<div className="text-center mt-4">
				<div className="display-4">
					Sport Tracker
				</div>
				<div className="lead mb-3">
					Please Sign In/Sign Up with google account.
				</div>
				<LoginBtn/>
				<div className="mt-4">
				<p id="t-user" onClick={() => this.props.userLoggedIn(0)}>
					Don't want to sign up for account? Click to login with test user account.
				</p>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {userIsLoggedIn: state.auth.loggedIn};
}

export default connect(mapStateToProps, { userLoggedIn })(Login);