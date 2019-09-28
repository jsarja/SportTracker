import React from 'react';
import { connect } from 'react-redux';

import './LoginBtn.css';
import { userLoggedIn } from '../../actions';
import { authInstance } from '../../utils/googleAuth';

class LoginBtn extends React.Component {
	componentDidMount() {
		// Get gapi.auth2 instance and call action when login status changes.
		authInstance.isSignedIn.listen(loggedIn => {
			if (loggedIn) {
				this.props.userLoggedIn(authInstance.currentUser.get().getId());
			}
		})
		
		this.forceUpdate();
	}

	onClick = () => {
		authInstance.signIn();
	}

	render() {
		// Don't show the button when auth instance and listener are not yet ready.
		if(!authInstance) {return null;}

		return (
			<button 
				className="btn btn-social btn-google text-light"
				onClick={this.onClick}
			>
				<span className="fab fa-google"></span> Sign in with Google
			</button>
		);
	}
}

export default connect(null, { userLoggedIn })(LoginBtn);